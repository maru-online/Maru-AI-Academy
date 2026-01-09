import crypto from 'crypto';

interface PayFastData {
  merchant_id: string;
  merchant_key: string;
  return_url?: string;
  cancel_url?: string;
  notify_url?: string;
  name_first?: string;
  name_last?: string;
  email_address?: string;
  m_payment_id?: string;
  amount: string;
  item_name: string;
  subscription_type?: string;
  billing_date?: string;
  recurring_amount?: string;
  frequency?: string;
  cycles?: string;
  passphrase?: string;
  [key: string]: string | undefined;
}

/**
 * Generate PayFast Signature
 * See: https://developers.payfast.co.za/docs#step_2_signature
 */
export function generatePayFastSignature(data: PayFastData, passphrase?: string): string {
  // 1. Convert object to URL encoded string
  let queryString = Object.keys(data)
    .filter((key) => key !== 'signature' && key !== 'passphrase' && data[key] !== undefined && data[key] !== '') // Exclude empty fields
    .sort() // Sort by key
    .map((key) => `${key}=${encodeURIComponent(data[key]!.trim()).replace(/%20/g, '+')}`)
    .join('&');

  // 2. Append passphrase if exists
  if (passphrase) {
    queryString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }

  // 3. MD5 Hash
  return crypto.createHash('md5').update(queryString).digest('hex');
}

export const PAYFAST_CONFIG = {
  merchant_id: process.env.PAYFAST_MERCHANT_ID || '10000100', // Sandbox ID
  merchant_key: process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a', // Sandbox Key
  passphrase: process.env.PAYFAST_PASSPHRASE || 'jt7NOE43FZPn', // Sandbox Passphrase
  is_sandbox: process.env.NODE_ENV !== 'production' || process.env.PAYFAST_SANDBOX === 'true',
  url: process.env.NODE_ENV === 'production' && process.env.PAYFAST_SANDBOX !== 'true'
    ? 'https://www.payfast.co.za/eng/process'
    : 'https://sandbox.payfast.co.za/eng/process',
};
