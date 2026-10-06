import assert from 'node:assert/strict';
import test from 'node:test';
import {
  NAVRATRI, NAVRATRI_ORDER_PATTERN, navratriQuote,
  navratriRegistrationOpen, paymentAmountPaise, validateNavratriPayment,
} from '../src/navratriOffer.ts';

test('Navratri full price and 90% coupon price use exact integer paise', () => {
  assert.equal(navratriQuote().amountPaise, 99900);
  assert.equal(navratriQuote('').discountPercent, 0);
  assert.deepEqual(navratriQuote(' kosnav90 '), {
    baseAmountPaise: 99900, discountPercent: 90,
    amountPaise: 9990, currency: 'INR', couponCode: 'KOSNAV90',
  });
  assert.throws(() => navratriQuote('KOSNAV100'));
  assert.throws(() => navratriQuote('random'));
});

test('enrollment ends after the ninth day in India, not browser UTC', () => {
  assert.equal(navratriRegistrationOpen(new Date('2026-10-06T00:00:00Z')), true);
  assert.equal(navratriRegistrationOpen(new Date('2026-10-19T18:29:59Z')), true);
  assert.equal(navratriRegistrationOpen(new Date('2026-10-19T18:30:00Z')), false);
});

test('gateway amounts are exact decimals, not rounded underpayments', () => {
  assert.equal(paymentAmountPaise('999.00'), 99900);
  assert.equal(paymentAmountPaise('99.90'), 9990);
  assert.equal(paymentAmountPaise('999'), 99900);
  for (const invalid of ['99.899', 'NaN', '-999', '9.99e2', '', 'Infinity', '999.00junk']) {
    assert.equal(paymentAmountPaise(invalid), null);
  }
});

const reference = 'NV26-1234567890abcdef12345678';
const merchant = 'dummy-test-merchant';
const order = { providerOrderId: reference, amountPaise: 99900, currency: 'INR' };
function response() {
  return new URLSearchParams({
    order_id: reference, order_status: 'Success',
    merchant_param1: NAVRATRI.eventId, merchant_param2: 'navratri',
    merchant_param4: merchant, currency: 'INR', amount: '999.00',
  });
}

test('valid callbacks match the saved order, event, merchant and exact amount', () => {
  assert.equal(validateNavratriPayment(response(), order, merchant), 'Success');
  const discounted = response();
  discounted.set('amount', '99.90');
  assert.equal(validateNavratriPayment(discounted, { ...order, amountPaise: 9990 }, merchant), 'Success');
  assert.equal(NAVRATRI_ORDER_PATTERN.test(reference), true);
  assert.equal(NAVRATRI_ORDER_PATTERN.test('NV26-1'), false);
});

test('callbacks cannot change the saved amount, currency, order or event', () => {
  for (const [field, value] of [
    ['order_id', 'other-order'], ['amount', '99.90'], ['amount', '999.001'],
    ['currency', 'USD'], ['merchant_param1', 'other-event'],
    ['merchant_param2', 'service'], ['merchant_param4', 'another-merchant'],
    ['merchant_id', 'another-merchant'], ['order_status', 'NotAStatus'],
  ]) {
    const params = response();
    params.set(field, value);
    assert.throws(() => validateNavratriPayment(params, order, merchant));
  }
});
