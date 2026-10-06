export const NAVRATRI = {
  eventId: 'navratri-2026',
  eventName: 'Navratri Circle — 9 Devis & 9 Celestial Bodies',
  startDate: '2026-10-11',
  endDate: '2026-10-19',
  amountPaise: 99900,
  currency: 'INR',
  closesAt: '2026-10-20T00:00:00+05:30',
} as const;

export const NAVRATRI_ORDER_PATTERN = /^NV26-[a-f0-9]{24}$/;

export function navratriRegistrationOpen(now = new Date()): boolean {
  return now.getTime() < new Date(NAVRATRI.closesAt).getTime();
}

export function navratriQuote(couponCode = '') {
  const normalized = couponCode.trim().toUpperCase();
  if (normalized && normalized !== 'KOSNAV90') {
    throw new Error('This coupon is not valid for the Navratri Circle.');
  }
  return {
    baseAmountPaise: NAVRATRI.amountPaise,
    discountPercent: normalized ? 90 : 0,
    amountPaise: normalized ? 9990 : NAVRATRI.amountPaise,
    currency: NAVRATRI.currency,
    couponCode: normalized || null,
  };
}

/** Parse the gateway's decimal amount without rounding a mismatched payment. */
export function paymentAmountPaise(amount: string): number | null {
  if (!/^\d{1,9}(?:\.\d{1,2})?$/.test(amount)) return null;
  const [whole, fraction = ''] = amount.split('.');
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}

/** The encrypted callback must agree with the server-saved enrollment order. */
export function validateNavratriPayment(
  params: URLSearchParams,
  order: { providerOrderId: string; amountPaise: number; currency: string },
  merchantId: string,
) {
  if (
    params.get('order_id') !== order.providerOrderId ||
    params.get('merchant_param1') !== NAVRATRI.eventId ||
    params.get('merchant_param2') !== 'navratri' ||
    // CCAvenue echoes merchant_param4; merchant_id is not always in its response.
    params.get('merchant_param4') !== merchantId ||
    (params.has('merchant_id') && params.get('merchant_id') !== merchantId) ||
    params.get('currency') !== order.currency ||
    paymentAmountPaise(params.get('amount') || '') !== order.amountPaise ||
    ![NAVRATRI.amountPaise, 9990].includes(order.amountPaise)
  ) {
    throw new Error('Payment response does not match the enrollment order.');
  }
  const status = params.get('order_status');
  if (!['Success', 'Aborted', 'Failure', 'Invalid', 'Timeout'].includes(status || '')) {
    throw new Error('Unrecognized payment status.');
  }
  return status;
}
