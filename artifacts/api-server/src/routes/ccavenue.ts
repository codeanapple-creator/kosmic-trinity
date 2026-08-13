import { Router } from 'express';
import { ccavenueEncrypt, ccavenueDecrypt } from '../ccavenueClient.js';
import { sendBookingConfirmation } from '../mailer.js';
import { db } from '@workspace/db';
import { bookingsTable } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

function getCCavenueUrl(): string {
  return process.env.CCAVENUE_MODE === 'production'
    ? 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
    : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
}

function generateBookingId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'KT-';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// Step 1: Frontend calls this to get encrypted request params for CCAvenue form POST
router.post('/ccavenue/initiate', (req, res) => {
  try {
    const { serviceName, amount, currency, clientEmail, clientName, clientPhone, itemType } = req.body;

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

    const amountInRupees = (Number(amount) / 100).toFixed(2);
    const phone = (clientPhone || '9999999999').replace(/\D/g, '').slice(0, 15) || '9999999999';

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
      billing_tel: phone,
      billing_address: 'India',
      billing_city: 'India',
      billing_state: 'India',
      billing_zip: '000000',
      billing_country: 'India',
      // merchant_param fields carry booking metadata through the CCAvenue round-trip
      merchant_param1: serviceName,
      merchant_param2: itemType || 'service',
      merchant_param3: clientName,
      merchant_param4: clientEmail,
      merchant_param5: phone,
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

// Step 2: CCAvenue POSTs back here after payment
// Verifies server-side, saves booking to DB, redirects to /thank-you
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

    const orderStatus   = params.get('order_status');
    const serviceName   = params.get('merchant_param1') || '';
    const clientName    = params.get('merchant_param3') || '';
    const clientEmail   = params.get('merchant_param4') || '';
    const phone         = params.get('merchant_param5') || '';
    const amount        = params.get('amount') || '0';
    const currency      = params.get('currency') || 'INR';
    const orderId       = params.get('order_id') || '';
    const trackingId    = params.get('tracking_id') || '';

    req.log.info({ orderStatus, orderId, clientEmail }, 'CCAvenue payment response');

    if (orderStatus === 'Success') {
      const amountPaise = Math.round(parseFloat(amount) * 100);

      // Idempotency: check if booking already exists for this orderId
      const [existing] = await db
        .select()
        .from(bookingsTable)
        .where(eq(bookingsTable.orderId, orderId));

      let bookingId: string;

      if (existing) {
        // Already processed — just redirect to thank-you
        bookingId = existing.bookingId;
        req.log.info({ bookingId, orderId }, 'Duplicate CCAvenue callback — reusing existing booking');
      } else {
        // Create new booking record
        bookingId = generateBookingId();

        await db.insert(bookingsTable).values({
          bookingId,
          orderId,
          customerName: clientName,
          customerEmail: clientEmail,
          phone: phone || null,
          serviceName,
          paymentStatus: 'SUCCESS',
          paymentAmount: amountPaise,
          paymentCurrency: currency,
          paymentTransactionId: trackingId || null,
          paymentDate: new Date(),
          bookingStatus: 'pending_birth_details',
        });

        req.log.info({ bookingId, orderId }, 'Booking created');

        // Send initial payment confirmation email (non-fatal)
        if (clientEmail && clientName && serviceName) {
          await sendBookingConfirmation({
            clientName,
            clientEmail,
            serviceName,
            calendarLink: 'https://kosmictrinity.in/thank-you?ref=' + bookingId,
            amount: amountPaise,
            currency,
          }).catch((err: Error) => {
            req.log.warn({ err }, 'Payment confirmation email failed (non-fatal)');
          });
        }
      }

      res.redirect(`/thank-you?ref=${encodeURIComponent(bookingId)}`);

    } else if (orderStatus === 'Aborted') {
      res.redirect('/booking?cancelled=1');
    } else {
      res.redirect(`/booking?error=payment_failed&order=${encodeURIComponent(orderId)}`);
    }
  } catch (err: any) {
    req.log.error({ err }, 'CCAvenue response error');
    res.redirect('/booking?error=server_error');
  }
});

export default router;
