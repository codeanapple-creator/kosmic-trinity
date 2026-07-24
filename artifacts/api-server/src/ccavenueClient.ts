import crypto from 'crypto';

// CCAvenue uses AES-256-CBC with an MD5-hashed key (as hex string → 32 ASCII bytes)
// and a fixed 16-byte IV, matching their official PHP/Java SDK.
const IV = Buffer.from([
  0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10,
  0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10,
]);

function deriveKey(workingKey: string): Buffer {
  // MD5 of working key produces a 32-char hex string; used as 32 ASCII bytes for AES-256
  const hexKey = crypto.createHash('md5').update(workingKey).digest('hex');
  return Buffer.from(hexKey, 'ascii');
}

export function ccavenueEncrypt(plainText: string, workingKey: string): string {
  const key = deriveKey(workingKey);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, IV);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function ccavenueDecrypt(encryptedHex: string, workingKey: string): string {
  const key = deriveKey(workingKey);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, IV);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
