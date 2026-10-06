import assert from 'node:assert/strict';
import test from 'node:test';
import { ccavenueEncrypt, ccavenueDecrypt } from '../src/ccavenueClient.ts';

// Dummy credentials only. This known-answer fixture was generated independently
// with OpenSSL using the AES-128-CBC, binary MD5 key and sequential IV specified
// in CCAvenue's Crypto.php kit. A round-trip alone would miss a mutually wrong
// encrypt/decrypt implementation (the original source of gateway error 10001).
const workingKey = 'CCAvenue-test-working-key';
const request = 'merchant_id=12345&order_id=KT-TEST&amount=5500.00&currency=INR';
const expected =
  '5eb47193a32f120c44579758d302b681ba36ef840d95a0c864c25a7e1a75cad9' +
  'b215cddac09b7ee1a11b2ffadb0f66f1008aae3e5d57436e1d9e5c5578971955';

test('request encryption matches the independent CCAvenue-compatible fixture', () => {
  assert.equal(ccavenueEncrypt(request, workingKey), expected);
});

test('response decryption accepts the independent fixture', () => {
  assert.equal(ccavenueDecrypt(expected, workingKey), request);
});

test('encrypted callback retains encoded fields and Unicode', () => {
  const response = new URLSearchParams({
    order_status: 'Success',
    order_id: 'KT-TEST',
    amount: '5500.00',
    merchant_param3: 'परीक्षण & Name',
    merchant_param4: 'test+booking@example.com',
  }).toString();
  assert.equal(ccavenueDecrypt(ccavenueEncrypt(response, workingKey), workingKey), response);
});

test('PKCS#7 padding handles empty, short and block-aligned messages', () => {
  for (const message of ['', 'x', 'x'.repeat(16), 'x'.repeat(32), 'नाम']) {
    const encrypted = ccavenueEncrypt(message, workingKey);
    assert.match(encrypted, /^[0-9a-f]+$/);
    assert.equal(encrypted.length % 32, 0);
    assert.equal(ccavenueDecrypt(encrypted, workingKey), message);
  }
});

test('decryption rejects a wrong working key and truncated ciphertext', () => {
  assert.throws(() => ccavenueDecrypt(expected, 'wrong-test-key'));
  assert.throws(() => ccavenueDecrypt(expected.slice(0, -2), workingKey));
});
