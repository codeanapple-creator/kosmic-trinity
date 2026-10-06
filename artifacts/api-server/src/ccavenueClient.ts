import crypto from 'crypto';

// CCAvenue's Crypto.php integration format: AES-128-CBC with PKCS#7 padding,
// the raw 16-byte MD5 digest of the working key, and this protocol-defined IV.
// Using the digest's 32 ASCII hex characters or a different IV breaks compatibility.
const IV = Buffer.from([
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
]);

function deriveKey(workingKey: string): Buffer {
  return crypto.createHash('md5').update(workingKey, 'utf8').digest();
}

export function ccavenueEncrypt(plainText: string, workingKey: string): string {
  const key = deriveKey(workingKey);
  const cipher = crypto.createCipheriv('aes-128-cbc', key, IV);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function ccavenueDecrypt(encryptedHex: string, workingKey: string): string {
  const key = deriveKey(workingKey);
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, IV);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
