// Development DB integration tests. Run with the existing tsx tool:
// pnpm --filter @workspace/scripts exec tsx --test ../artifacts/api-server/tests/*.test.mjs
// No gateway requests or emails are sent; only this suite's rows are removed.
import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { randomBytes } from 'node:crypto';
import { eq, inArray } from 'drizzle-orm';
import { db, pool, ordersTable, bookingsTable } from '@workspace/db';
import { NAVRATRI } from '../src/navratriOffer.ts';
import {
  navratriEnrollmentResponse, navratriOrderFilter, settleNavratriPayment,
} from '../src/navratriPayments.ts';

if (process.env.NODE_ENV === 'production') {
  throw new Error('Run Navratri integration tests against the development DB only.');
}

const orderIds = [];
const merchant = 'navratri-dummy-merchant';
async function createOrder(amountPaise = 99900) {
  const orderId = `NV26-${randomBytes(12).toString('hex')}`;
  orderIds.push(orderId);
  await db.insert(ordersTable).values({
    provider: 'ccavenue', providerOrderId: orderId,
    itemName: NAVRATRI.eventName, itemType: NAVRATRI.eventId,
    clientName: 'Navratri Integration Test',
    clientEmail: 'navratri-test@example.invalid',
    amountPaise, currency: 'INR', status: 'created',
  });
  return orderId;
}
async function getOrder(orderId) {
  const [order] = await db.select().from(ordersTable).where(navratriOrderFilter(orderId));
  return order;
}
function callback(orderId, amount = '999.00', status = 'Success') {
  return new URLSearchParams({
    order_id: orderId, order_status: status, amount, currency: 'INR',
    merchant_param1: NAVRATRI.eventId, merchant_param2: 'navratri',
    merchant_param4: merchant, tracking_id: 'DUMMY-TRACKING-ID',
  });
}
const noEmail = async () => {};
after(async () => {
  try {
    if (orderIds.length) {
      await db.delete(bookingsTable).where(inArray(bookingsTable.orderId, orderIds));
      await db.delete(ordersTable).where(inArray(ordersTable.providerOrderId, orderIds));
    }
  } finally {
    await pool.end();
  }
});

test('pending enrollments never expose the group invitation', async () => {
  const id = await createOrder();
  const enrollment = navratriEnrollmentResponse(await getOrder(id));
  assert.equal(enrollment.status, 'pending');
  assert.equal(enrollment.whatsappUrl, null);
});

test('verified payment unlocks the group, persists a confirmed booking and is idempotent', async () => {
  const id = await createOrder(9990);
  let receipts = 0;
  const notify = async () => { receipts++; };
  const path = await settleNavratriPayment(callback(id, '99.90'), merchant, notify);
  assert.equal(path, `/navratri/success?ref=${id}`);
  const paid = navratriEnrollmentResponse(await getOrder(id));
  assert.equal(paid.status, 'paid');
  assert.ok(paid.whatsappUrl.startsWith('https://chat.whatsapp.com/'));
  const bookings = await db.select().from(bookingsTable).where(eq(bookingsTable.orderId, id));
  assert.equal(bookings.length, 1);
  assert.equal(bookings[0].paymentAmount, 9990);
  assert.equal(bookings[0].bookingStatus, 'confirmed');
  await settleNavratriPayment(callback(id, '99.90'), merchant, notify);
  assert.equal(receipts, 1);
  assert.equal((await db.select().from(bookingsTable).where(eq(bookingsTable.orderId, id))).length, 1);
  // A later cancellation must never downgrade a verified paid enrollment.
  assert.equal(await settleNavratriPayment(callback(id, '99.90', 'Aborted'), merchant, notify), path);
  assert.equal((await getOrder(id)).status, 'paid');
});

test('failure and cancellation cannot unlock the group', async () => {
  for (const status of ['Failure', 'Aborted']) {
    const id = await createOrder();
    const path = await settleNavratriPayment(callback(id, '999.00', status), merchant, noEmail);
    assert.equal(path, `/navratri?error=${status === 'Aborted' ? 'cancelled' : 'payment_failed'}`);
    const enrollment = navratriEnrollmentResponse(await getOrder(id));
    assert.equal(enrollment.status, 'failed');
    assert.equal(enrollment.whatsappUrl, null);
    assert.equal((await db.select().from(bookingsTable).where(eq(bookingsTable.orderId, id))).length, 0);
  }
});

test('underpayment leaves the order unconfirmed and creates no booking', async () => {
  const id = await createOrder();
  await assert.rejects(settleNavratriPayment(callback(id, '99.90'), merchant, noEmail));
  assert.equal((await getOrder(id)).status, 'created');
  assert.equal((await db.select().from(bookingsTable).where(eq(bookingsTable.orderId, id))).length, 0);
});

test('unknown orders cannot be accepted, even with valid-looking callback fields', async () => {
  const id = `NV26-${randomBytes(12).toString('hex')}`;
  await assert.rejects(settleNavratriPayment(callback(id), merchant, noEmail));
});
