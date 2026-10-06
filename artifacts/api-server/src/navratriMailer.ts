import nodemailer from 'nodemailer';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]!));
}

export async function sendNavratriConfirmation(params: {
  clientName: string; clientEmail: string; orderId: string;
  amountPaise: number; whatsappUrl: string;
}) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Navratri email is not configured.');
  }
  const transport = nodemailer.createTransport({
    service: 'gmail',
    connectionTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
  const amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
    .format(params.amountPaise / 100);
  const subject = 'You’re in — Navratri Circle, 11 October 2026';
  const text = `Hello ${params.clientName},\n\nYour ${amount} payment for the Navratri Circle is confirmed.\n11–19 October 2026: 9 days, 9 Devis and 9 celestial bodies.\n\nJoin our WhatsApp circle for meditations, activities, intuitive Tarot guidance, rituals and integration support:\n${params.whatsappUrl}\n\nA bonus gift awaits those who complete all nine days.\nReference: ${params.orderId}\n\nWith love,\nKosmic Trinity`;
  await transport.sendMail({
    from: `"Kosmic Trinity" <${process.env.GMAIL_USER}>`,
    to: params.clientEmail,
    subject,
    text,
    html: `<div style="font-family:Georgia,serif;background:#250815;color:#f5e8c8;padding:32px">
      <h1 style="color:#C9A84C">Welcome to the Navratri Circle</h1>
      <p>Hello ${escapeHtml(params.clientName)}, your payment of ${amount} is confirmed.</p>
      <p>11–19 October 2026 · 9 days · 9 Devis · 9 celestial bodies</p>
      <p>Join the WhatsApp circle for activities, meditations, intuitive Tarot guidance, rituals and nine days of integration support.</p>
      <p><a href="${escapeHtml(params.whatsappUrl)}" style="display:inline-block;background:#C9A84C;color:#250815;padding:14px 22px;text-decoration:none">Join the WhatsApp Circle</a></p>
      <p>A bonus gift awaits those who complete all nine days.</p>
      <p>Reference: ${escapeHtml(params.orderId)}</p><p>With love,<br>Kosmic Trinity</p>
    </div>`,
  });
}
