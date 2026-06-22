import { Router } from 'express';
import crypto from 'crypto';
import { getRazorpayClient } from '../razorpayClient.js';
import { db, ordersTable } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { sendOrderConfirmation } from '../mailer.js';

const router = Router();

router.post('/razorpay/create-order', async (req, res) => {
  try {
    const { itemName, itemType, amountPaise, currency, clientEmail, clientName } = req.body;

    if (!itemName || !amountPaise || !clientEmail || !clientName) {
      res.status(400).json({ error: 'Missing required fields' }); return;
    }

    const rzp = getRazorpayClient();

    const rzpOrder = await rzp.orders.create({
      amount: amountPaise,
      currency: currency ?? 'INR',
      receipt: `kt_${Date.now()}`,
      notes: { itemName, clientName, clientEmail, itemType: itemType ?? 'service' },
    });

    await db.insert(ordersTable).values({
      provider: 'razorpay',
      providerOrderId: rzpOrder.id,
      providerPaymentId: '',
      itemName,
      itemType: itemType ?? 'service',
      clientName,
      clientEmail,
      amountPaise,
      currency: currency ?? 'INR',
      status: 'created',
    });

    res.json({
      orderId: rzpOrder.id,
      amount: amountPaise,
      currency: currency ?? 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    req.log.error({ err }, 'Razorpay create-order error');
    res.status(500).json({ error: err.message });
  }
});

router.post('/razorpay/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ error: 'Missing payment fields' }); return;
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      res.status(500).json({ error: 'Server misconfiguration' }); return;
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSig = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      res.status(400).json({ error: 'Invalid payment signature' }); return;
    }

    const [order] = await db
      .update(ordersTable)
      .set({ providerPaymentId: razorpay_payment_id, status: 'paid', paidAt: new Date() })
      .where(eq(ordersTable.providerOrderId, razorpay_order_id))
      .returning();

    if (order) {
      await sendOrderConfirmation({
        clientName: order.clientName,
        clientEmail: order.clientEmail,
        itemName: order.itemName,
        itemType: order.itemType,
        amountPaise: order.amountPaise,
        currency: order.currency,
      }).catch((err) => {
        req.log.warn({ err }, 'Order confirmation email failed (non-fatal)');
      });
    }

    res.json({
      success: true,
      itemName: order?.itemName,
      itemType: order?.itemType,
      clientName: order?.clientName,
      clientEmail: order?.clientEmail,
      amountPaid: order?.amountPaise,
      currency: order?.currency,
    });
  } catch (err: any) {
    req.log.error({ err }, 'Razorpay verify error');
    res.status(500).json({ error: err.message });
  }
});

export default router;
