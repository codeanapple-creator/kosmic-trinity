import { Router } from 'express';
import { ccavenueEncrypt, ccavenueDecrypt } from '../ccavenueClient.js';
import { sendBookingConfirmation } from '../mailer.js';

const router = Router();

const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.google.com/calendar/appointments';

function getCCavenueUrl(): string {
  return process.env.CCAVENUE_MODE === 'production'
    ? 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
    : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
}

// Step 1: Frontend calls this to get encrypted request params for CCAvenue form POST
router.post('/ccavenue/initiate', (req, res) => {
  try {
    const { serviceName, amount, currency, clientEmail, clientName, itemType } = req.body;

    if (!serviceName || !amount || !clientEmail || !clientName) {
      res.status(400).json({ error: 'Missing required fields' }); return;
    }

    const workingKey = process.env.CCAVENUE_WORKING_KEY;
    const merchantId = process.env.CCAVENUE_MERCHANT_ID;
    const accessCode = process.env.CCAVENUE_ACCESS_CODE;

    if (!workingKey || !merchantId || !accessCode) {
      res.status(500).json({ error: 'CCAvenue credentials not configured' }); return;
    }

    const baseUrl = process.env.SITE_URL ?? `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;
    const orderId = `KT-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    // CCAvenue expects amount in rupees (not paise)
    const amountInRupees = (Number(amount) / 100).toFixed(2);

    const requestParams = new URLSearchParams({
      merchant_id: merchantId,
      order_id: orderId,
      amount: amountInRupees,
      currency: (currency || 'INR').toUpperCase(),
      redirect_url: `${baseUrl}/api/ccavenue/response`,
      cancel_url: `${baseUrl}/api/ccavenue/response`,
      language: 'EN',
      billing_name: clientName,
      billing_email: clientEmail,
      // merchant_param fields carry booking metadata through the CCAvenue round-trip
      merchant_param1: serviceName,
      merchant_param2: itemType || 'service',
      merchant_param3: clientName,
      merchant_param4: clientEmail,
    });

    const encryptedData = ccavenueEncrypt(requestParams.toString(), workingKey);

    res.json({
      encryptedData,
      accessCode,
      ccavenueUrl: getCCavenueUrl(),
      orderId,
    });
  } catch (err: any) {
    req.log.error({ err }, 'CCAvenue initiate error');
    res.status(500).json({ error: err.message });
  }
});

// Step 2: CCAvenue POSTs back here after payment (redirect_url / cancel_url)
// This is a server-side handler — CCAvenue posts form data, we decrypt and redirect the browser.
router.post('/ccavenue/response', async (req, res) => {
  try {
    const { encResp } = req.body as { encResp?: string };

    if (!encResp) {
      res.redirect('/booking?error=no_response');
      return;
    }

    const workingKey = process.env.CCAVENUE_WORKING_KEY;
    if (!workingKey) {
      res.redirect('/booking?error=config');
      return;
    }

    const decrypted = ccavenueDecrypt(encResp, workingKey);
    const params = new URLSearchParams(decrypted);

    const orderStatus = params.get('order_status');
    const serviceName = params.get('merchant_param1') || '';
    const itemType = params.get('merchant_param2') || 'service';
    const clientName = params.get('merchant_param3') || '';
    const clientEmail = params.get('merchant_param4') || '';
    const amount = params.get('amount') || '0';
    const currency = params.get('currency') || 'INR';
    const orderId = params.get('order_id') || '';

    req.log.info({ orderStatus, orderId, clientEmail }, 'CCAvenue payment response');

    if (orderStatus === 'Success') {
      const amountPaise = Math.round(parseFloat(amount) * 100);

      if (clientEmail && clientName && serviceName) {
        await sendBookingConfirmation({
          clientName,
          clientEmail,
          serviceName,
          calendarLink: GOOGLE_CALENDAR_BOOKING_URL,
          amount: amountPaise,
          currency,
        }).catch((err: Error) => {
          req.log.warn({ err }, 'Email send error (non-fatal)');
        });
      }

      res.redirect(
        `/booking/success?payment=ccavenue` +
        `&item=${encodeURIComponent(serviceName)}` +
        `&name=${encodeURIComponent(clientName)}` +
        `&email=${encodeURIComponent(clientEmail)}` +
        `&amount=${amountPaise}` +
        `&currency=${encodeURIComponent(currency)}` +
        `&order_id=${encodeURIComponent(orderId)}`
      );
    } else if (orderStatus === 'Aborted') {
      res.redirect('/booking?cancelled=1');
    } else {
      // Failure — redirect back to booking with error hint
      res.redirect(`/booking?error=payment_failed&order=${encodeURIComponent(orderId)}`);
    }
  } catch (err: any) {
    req.log.error({ err }, 'CCAvenue response error');
    res.redirect('/booking?error=server_error');
  }
});

export default router;
