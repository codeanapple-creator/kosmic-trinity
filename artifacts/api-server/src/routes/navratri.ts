import { Router } from 'express';
import { randomBytes } from 'node:crypto';
import { db, ordersTable } from '@workspace/db';
import {
  GetNavratriOfferResponse, QuoteNavratriBody, QuoteNavratriResponse,
  InitiateNavratriBody, InitiateNavratriResponse, GetNavratriEnrollmentResponse,
} from '@workspace/api-zod';
import { NAVRATRI, NAVRATRI_ORDER_PATTERN, navratriQuote, navratriRegistrationOpen } from '../navratriOffer.js';
import { navratriEnrollmentResponse, navratriOrderFilter } from '../navratriPayments.js';
import { ccavenueEncrypt } from '../ccavenueClient.js';

const router = Router();

router.get('/navratri/offer', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(GetNavratriOfferResponse.parse({
    ...NAVRATRI, registrationOpen: navratriRegistrationOpen(),
  }));
});

router.post('/navratri/quote', (req, res) => {
  const parsed = QuoteNavratriBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Please enter a valid coupon code.' }); return;
  }
  try {
    res.json(QuoteNavratriResponse.parse(navratriQuote(parsed.data.couponCode)));
  } catch {
    res.status(400).json({ error: 'This coupon is not valid for the Navratri Circle.' });
  }
});

router.post('/navratri/initiate', async (req, res): Promise<void> => {
  const parsed = InitiateNavratriBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Please provide your name, a valid email and phone number.' }); return;
  }
  const participant = parsed.data;
  const name = participant.clientName.trim();
  const phone = participant.clientPhone.replace(/\D/g, '');
  if (name.length < 2 || phone.length < 6 || phone.length > 15) {
    res.status(400).json({ error: 'Please provide a valid name and phone number.' }); return;
  }
  let quote;
  try {
    quote = navratriQuote(participant.couponCode);
  } catch {
    res.status(400).json({ error: 'This coupon is not valid for the Navratri Circle.' }); return;
  }
  if (!navratriRegistrationOpen()) {
    res.status(409).json({ error: 'Enrollment for this Navratri Circle has closed.' }); return;
  }
  try {
    const workingKey = process.env.CCAVENUE_WORKING_KEY;
    const merchantId = process.env.CCAVENUE_MERCHANT_ID;
    const accessCode = process.env.CCAVENUE_ACCESS_CODE;
    if (!workingKey || !merchantId || !accessCode) {
      res.status(503).json({ error: 'Checkout is temporarily unavailable. Please try again later.' }); return;
    }
    // A 96-bit random reference protects enrollment lookup; never use a
    // sequential ID or an easily guessed booking reference for private access.
    const orderId = `NV26-${randomBytes(12).toString('hex')}`;
    const baseUrl = (process.env.SITE_URL || 'https://kosmictrinity.in').replace(/\/$/, '');
    const requestParams = new URLSearchParams({
      merchant_id: merchantId,
      order_id: orderId,
      amount: (quote.amountPaise / 100).toFixed(2),
      currency: NAVRATRI.currency,
      redirect_url: `${baseUrl}/api/ccavenue/response`,
      cancel_url: `${baseUrl}/api/ccavenue/response`,
      language: 'EN',
      billing_name: name,
      billing_email: participant.clientEmail.trim(),
      billing_tel: phone,
      billing_country: 'India',
      merchant_param1: NAVRATRI.eventId,
      merchant_param2: 'navratri',
      merchant_param3: quote.couponCode || '',
      merchant_param4: merchantId,
      merchant_param5: '1',
    });
    const encryptedData = ccavenueEncrypt(requestParams.toString(), workingKey);
    const response = InitiateNavratriResponse.parse({
      encryptedData,
      accessCode,
      ccavenueUrl: process.env.CCAVENUE_MODE === 'production'
        ? 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
        : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
      orderId,
      amountPaise: quote.amountPaise,
      currency: NAVRATRI.currency,
    });
    // Persist before leaving the site so callbacks/reloads survive restarts.
    await db.insert(ordersTable).values({
      provider: 'ccavenue', providerOrderId: orderId,
      itemName: NAVRATRI.eventName, itemType: NAVRATRI.eventId,
      clientName: name, clientEmail: participant.clientEmail.trim(),
      amountPaise: quote.amountPaise, currency: NAVRATRI.currency, status: 'created',
    });
    res.set('Cache-Control', 'no-store');
    res.json(response);
  } catch (err) {
    req.log.error({ err }, 'Navratri checkout initiation failed');
    res.status(503).json({ error: 'Could not start checkout. Please try again later.' });
  }
});

router.get('/navratri/enrollment/:orderId', async (req, res): Promise<void> => {
  res.set('Cache-Control', 'no-store');
  const orderId = String(req.params.orderId);
  if (!NAVRATRI_ORDER_PATTERN.test(orderId)) {
    res.status(404).json({ error: 'Enrollment not found. Please check your payment reference.' }); return;
  }
  try {
    const [order] = await db.select().from(ordersTable).where(navratriOrderFilter(orderId));
    if (!order) {
      res.status(404).json({ error: 'Enrollment not found. Please check your payment reference.' }); return;
    }
    res.json(GetNavratriEnrollmentResponse.parse(navratriEnrollmentResponse(order)));
  } catch (err) {
    req.log.error({ err }, 'Navratri enrollment lookup failed');
    res.status(503).json({ error: 'Could not verify payment. Please try again shortly.' });
  }
});

export default router;
