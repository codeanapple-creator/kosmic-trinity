import { Router } from 'express';
import { db, enquiriesTable } from '@workspace/db';
import { sendEnquiry } from '../mailer.js';

const router = Router();

router.post('/enquiry', async (req, res) => {
  const { name, company, email, phone, productInterest, message } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' }); return;
  }

  try {
    await db.insert(enquiriesTable).values({
      name,
      company: company ?? '',
      email,
      phone: phone ?? '',
      productInterest: productInterest ?? '',
      message: message ?? '',
    });
  } catch (dbErr: any) {
    req.log.error({ err: dbErr }, 'Failed to save enquiry to database');
    res.status(500).json({ error: 'Failed to send enquiry. Please try again later.' }); return;
  }

  res.json({ success: true });

  sendEnquiry({ name, company: company ?? '', email, phone: phone ?? '', productInterest: productInterest ?? '', message: message ?? '' })
    .catch((mailErr: any) => {
      req.log.warn({ err: mailErr }, 'Enquiry saved to DB but email notification failed');
    });
});

export default router;
