import { Router } from 'express';
import { getUncachableStripeClient } from '../stripeClient.js';
import { sendBookingConfirmation } from '../mailer.js';
import { WebhookHandlers } from '../webhookHandlers.js';

const router = Router();

const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.google.com/calendar/appointments';

router.post('/booking/create-checkout', async (req, res) => {
  try {
    const { serviceName, amount, currency, clientEmail, clientName } = req.body;

    if (!serviceName || !amount || !currency || !clientEmail || !clientName) {
      res.status(400).json({ error: 'Missing required fields' }); return;
    }

    const stripe = await getUncachableStripeClient();

    const baseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: amount,
            product_data: {
              name: serviceName,
              description: 'Kosmic Trinity — Spiritual Astrology Reading',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: clientEmail,
      metadata: {
        serviceName,
        clientName,
        clientEmail,
      },
      success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/booking`,
    });

    res.json({ url: session.url });
  } catch (err: any) {
    req.log.error({ err }, 'Checkout error');
    res.status(500).json({ error: err.message });
  }
});

router.get('/booking/verify', async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id || typeof session_id !== 'string') {
      res.status(400).json({ error: 'Missing session_id' }); return;
    }

    const stripe = await getUncachableStripeClient();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      res.status(402).json({ error: 'Payment not completed' }); return;
    }

    const { serviceName, clientName, clientEmail } = session.metadata ?? {};

    if (clientEmail && clientName && serviceName) {
      await sendBookingConfirmation({
        clientName,
        clientEmail,
        serviceName,
        calendarLink: GOOGLE_CALENDAR_BOOKING_URL,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? 'inr',
      }).catch((err) => {
        req.log.warn({ err }, 'Email send error (non-fatal)');
      });
    }

    res.json({
      success: true,
      serviceName,
      clientName,
      clientEmail,
      calendarLink: GOOGLE_CALENDAR_BOOKING_URL,
      amountPaid: session.amount_total,
      currency: session.currency,
    });
  } catch (err: any) {
    req.log.error({ err }, 'Verify error');
    res.status(500).json({ error: err.message });
  }
});

router.post('/stripe/webhook', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  if (!signature) { res.status(400).json({ error: 'Missing signature' }); return; }
  const sig = Array.isArray(signature) ? signature[0] : signature;
  try {
    await WebhookHandlers.processWebhook(req.body as Buffer, sig);
    res.status(200).json({ received: true });
  } catch (err: any) {
    req.log.error({ err }, 'Webhook error');
    res.status(400).json({ error: 'Webhook error' });
  }
});

export default router;
