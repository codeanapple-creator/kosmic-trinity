import { randomBytes } from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { db, ordersTable, bookingsTable } from '@workspace/db';
import { NAVRATRI, NAVRATRI_ORDER_PATTERN, validateNavratriPayment } from './navratriOffer.js';
import { sendNavratriConfirmation } from './navratriMailer.js';
import { logger } from './lib/logger.js';

// The invite is deliberately server-only: never expose it in the public offer,
// checkout bundle, pending enrollment status, or failed-payment page.
const WHATSAPP_INVITE = 'https://chat.whatsapp.com/F8oTz0Wby5xAnnP94Ge4PA?s=sh&p=a&ilr=4&iam=0';

export function navratriOrderFilter(orderId: string) {
  return and(
    eq(ordersTable.providerOrderId, orderId),
    eq(ordersTable.provider, 'ccavenue'),
    eq(ordersTable.itemType, NAVRATRI.eventId),
  );
}

export function navratriEnrollmentResponse(order: {
  status: string; amountPaise: number; currency: string;
}) {
  const status = order.status === 'paid' ? 'paid' : order.status === 'created' ? 'pending' : 'failed';
  return {
    status,
    amountPaise: order.amountPaise,
    currency: order.currency,
    eventName: NAVRATRI.eventName,
    startDate: NAVRATRI.startDate,
    whatsappUrl: status === 'paid' ? WHATSAPP_INVITE : null,
  };
}

function bookingReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'KT-' + [...randomBytes(8)].map(byte => alphabet[byte % alphabet.length]).join('');
}

/** Called only after CCAvenue's response has been decrypted with the working key. */
export async function settleNavratriPayment(
  params: URLSearchParams,
  merchantId: string,
  sendConfirmation: typeof sendNavratriConfirmation = sendNavratriConfirmation,
): Promise<string> {
  const orderId = params.get('order_id') || '';
  if (!NAVRATRI_ORDER_PATTERN.test(orderId)) {
    throw new Error('Invalid Navratri order reference.');
  }
  const result = await db.transaction(async (tx) => {
    // Serialize callbacks for the same order, so gateway retries never create
    // duplicate enrollments, send duplicate receipts or downgrade a paid order.
    const [order] = await tx.select().from(ordersTable)
      .where(navratriOrderFilter(orderId)).for('update');
    if (!order) throw new Error('Navratri order not found.');
    const status = validateNavratriPayment(params, order, merchantId);
    if (order.status === 'paid') return { order, newlyPaid: false, status: 'Success' };
    if (status !== 'Success') {
      await tx.update(ordersTable).set({ status: 'failed' }).where(eq(ordersTable.id, order.id));
      return { order, newlyPaid: false, status };
    }
    const now = new Date();
    await tx.update(ordersTable).set({
      status: 'paid',
      providerPaymentId: params.get('tracking_id') || '',
      paidAt: now,
    }).where(eq(ordersTable.id, order.id));
    // Reuse the existing admin-visible booking records; no new DB schema or
    // birth-details/calendar step is needed for this nine-day group circle.
    await tx.insert(bookingsTable).values({
      bookingId: bookingReference(),
      orderId,
      customerName: order.clientName,
      customerEmail: order.clientEmail,
      phone: params.get('billing_tel') || null,
      serviceName: NAVRATRI.eventName,
      paymentStatus: 'SUCCESS',
      paymentAmount: order.amountPaise,
      paymentCurrency: order.currency,
      paymentTransactionId: params.get('tracking_id') || null,
      paymentDate: now,
      bookingStatus: 'confirmed',
    }).onConflictDoNothing({ target: bookingsTable.orderId });
    return { order, newlyPaid: true, status };
  });

  if (result.newlyPaid) {
    // Email delivery must not block the gateway redirect or undo a paid order.
    void sendConfirmation({
      clientName: result.order.clientName,
      clientEmail: result.order.clientEmail,
      orderId,
      amountPaise: result.order.amountPaise,
      whatsappUrl: WHATSAPP_INVITE,
    }).catch(err => logger.warn({ err, orderId }, 'Navratri confirmation email failed'));
  }
  return result.status === 'Success'
    ? `/navratri/success?ref=${encodeURIComponent(orderId)}`
    : `/navratri?error=${result.status === 'Aborted' ? 'cancelled' : 'payment_failed'}`;
}
