import nodemailer from 'nodemailer';

/** Google Calendar appointment scheduling link — update here to change everywhere */
const APPOINTMENT_URL = 'https://calendar.app.google/5RdqsFPw5yKBmYSw5';

export async function sendBookingConfirmation(params: {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  calendarLink: string;
  amount: number;
  currency: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: params.currency.toUpperCase(),
  }).format(params.amount / 100);

  const mailToKosmic = {
    from: `"Kosmic Trinity Bookings" <${process.env.GMAIL_USER}>`,
    to: 'kosmictrinity@gmail.com',
    subject: `New Booking: ${params.serviceName} — ${params.clientName}`,
    html: `
      <div style="font-family: Georgia, serif; background: #1a0508; color: #f5e8c8; padding: 32px; border-radius: 8px;">
        <h2 style="color: #C9A84C;">New Booking Received ✦</h2>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color:#aaa;">Client Name</td><td style="padding: 8px 0;">${params.clientName}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Client Email</td><td style="padding: 8px 0;">${params.clientEmail}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Service</td><td style="padding: 8px 0;">${params.serviceName}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Amount Paid</td><td style="padding: 8px 0; color: #C9A84C;">${formattedAmount}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #aaa;">The client has been sent a calendar booking link. Please confirm their session time.</p>
      </div>
    `,
  };

  const mailToClient = {
    from: `"Kosmic Trinity" <${process.env.GMAIL_USER}>`,
    to: params.clientEmail,
    subject: `Your Booking is Confirmed — ${params.serviceName}`,
    html: `
      <div style="font-family: Georgia, serif; background: #1a0508; color: #f5e8c8; padding: 32px; border-radius: 8px; max-width: 600px;">
        <h2 style="color: #C9A84C; margin-top: 0;">Booking Confirmed ✦</h2>
        <p>Dear ${params.clientName},</p>
        <p>Your payment of <strong style="color: #C9A84C;">${formattedAmount}</strong> for <strong>${params.serviceName}</strong> has been received. We're delighted to have you on this journey.</p>

        <hr style="border: none; border-top: 1px solid #3a1a20; margin: 24px 0;" />

        <!-- Step 1: Fill birth details -->
        <p style="margin: 0 0 6px; color: #C9A84C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Step 1 — Share Your Birth Details</p>
        <p style="margin: 0 0 12px; color: #ccc; font-size: 14px;">To prepare your personalised session, please complete your birth details using the button below:</p>
        <a href="${params.calendarLink}" style="display:inline-block; padding: 12px 24px; background: #3a1a20; color: #C9A84C; text-decoration: none; border-radius: 4px; font-weight: bold; border: 1px solid #C9A84C; font-size: 14px;">
          Enter Birth Details →
        </a>

        <hr style="border: none; border-top: 1px solid #3a1a20; margin: 28px 0;" />

        <!-- Step 2: Book session time -->
        <p style="margin: 0 0 6px; color: #C9A84C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Step 2 — Book Your Session Time</p>
        <p style="margin: 0 0 12px; color: #ccc; font-size: 14px;">Please choose a convenient date and time for your session using the link below. Once booked, we'll see it on our calendar and confirm your session.</p>
        <a href="${APPOINTMENT_URL}" style="display:inline-block; padding: 12px 28px; background: #C9A84C; color: #1a0508; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">
          Book Your Session Time →
        </a>
        <p style="margin: 10px 0 0; font-size: 12px; color: #888;">
          Or copy this link: <a href="${APPOINTMENT_URL}" style="color: #C9A84C;">${APPOINTMENT_URL}</a>
        </p>

        <hr style="border: none; border-top: 1px solid #3a1a20; margin: 28px 0;" />

        <p style="margin: 0; color: #aaa; font-size: 13px; line-height: 1.7;">
          Questions? Reply to this email or write to us at <a href="mailto:kosmictrinity@gmail.com" style="color: #C9A84C;">kosmictrinity@gmail.com</a>.<br/>
          With cosmic love,<br/>
          <strong style="color: #f5e8c8;">The Kosmic Trinity</strong>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailToKosmic);
  await transporter.sendMail(mailToClient);
}

export async function sendBookingConfirmedEmail(params: {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  bookingId: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  calendarLink: string | null;
  amount: number;
  currency: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: params.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(params.amount / 100);

  const calendarBtn = params.calendarLink
    ? `<a href="${params.calendarLink}" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#C9A84C;color:#1a0508;text-decoration:none;border-radius:4px;font-weight:bold;">Add to Google Calendar</a>`
    : '<p style="color:#aaa;">Your session time will be confirmed shortly via email.</p>';

  const mailToKosmic = {
    from: `"Kosmic Trinity Bookings" <${process.env.GMAIL_USER}>`,
    to: 'kosmictrinity@gmail.com',
    subject: `Birth Details Received – ${params.bookingId} – ${params.clientName}`,
    html: `
      <div style="font-family:Georgia,serif;background:#1a0508;color:#f5e8c8;padding:32px;border-radius:8px;">
        <h2 style="color:#C9A84C;">Birth Details Submitted ✦</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr><td style="padding:8px 0;color:#aaa;">Booking ID</td><td style="padding:8px 0;color:#C9A84C;">${params.bookingId}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Client</td><td style="padding:8px 0;">${params.clientName} &lt;${params.clientEmail}&gt;</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Service</td><td style="padding:8px 0;">${params.serviceName}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Amount Paid</td><td style="padding:8px 0;color:#C9A84C;">${formattedAmount}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Date of Birth</td><td style="padding:8px 0;">${params.dateOfBirth}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Birth Time</td><td style="padding:8px 0;">${params.birthTime}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Birth Place</td><td style="padding:8px 0;">${params.birthPlace}</td></tr>
        </table>
        ${params.calendarLink ? `<p style="margin-top:16px;color:#aaa;">Calendar event: <a href="${params.calendarLink}" style="color:#C9A84C;">${params.calendarLink}</a></p>` : '<p style="margin-top:16px;color:#e88;">Calendar event could not be created automatically — please retry from admin dashboard.</p>'}
      </div>
    `,
  };

  const mailToClient = {
    from: `"Kosmic Trinity" <${process.env.GMAIL_USER}>`,
    to: params.clientEmail,
    subject: `Your KosmicTrinity Session is Confirmed — ${params.bookingId}`,
    html: `
      <div style="font-family:Georgia,serif;background:#1a0508;color:#f5e8c8;padding:32px;border-radius:8px;">
        <h2 style="color:#C9A84C;">Your Session is Confirmed ✦</h2>
        <p>Dear ${params.clientName},</p>
        <p>Thank you for completing your booking. Your birth details have been received and your KosmicTrinity session is confirmed.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr><td style="padding:8px 0;color:#aaa;">Booking ID</td><td style="padding:8px 0;color:#C9A84C;">${params.bookingId}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Service</td><td style="padding:8px 0;">${params.serviceName}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Amount Paid</td><td style="padding:8px 0;">${formattedAmount}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Date of Birth</td><td style="padding:8px 0;">${params.dateOfBirth}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Birth Time</td><td style="padding:8px 0;">${params.birthTime}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">Birth Place</td><td style="padding:8px 0;">${params.birthPlace}</td></tr>
        </table>
        <div style="margin-top:24px;">${calendarBtn}</div>
        <p style="margin-top:32px;color:#aaa;font-size:13px;">
          Questions? Reply to this email or reach us at kosmictrinity@gmail.com.<br/>
          With cosmic love,<br/>
          <strong>The Kosmic Trinity</strong>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailToKosmic);
  await transporter.sendMail(mailToClient);
}

export async function sendOrderConfirmation(params: {
  clientName: string;
  clientEmail: string;
  itemName: string;
  itemType: string;
  amountPaise: number;
  currency: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: params.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(params.amountPaise / 100);

  const isService = params.itemType === 'service';

  const mailToKosmic = {
    from: `"Kosmic Trinity" <${process.env.GMAIL_USER}>`,
    to: 'kosmictrinity@gmail.com',
    subject: `New ${isService ? 'Booking' : 'Order'}: ${params.itemName} — ${params.clientName}`,
    html: `
      <div style="font-family: Georgia, serif; background: #1a0508; color: #f5e8c8; padding: 32px; border-radius: 8px;">
        <h2 style="color: #C9A84C;">New ${isService ? 'Booking' : 'Order'} Received ✦</h2>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color:#aaa;">Client Name</td><td style="padding: 8px 0;">${params.clientName}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Client Email</td><td style="padding: 8px 0;">${params.clientEmail}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">${isService ? 'Service' : 'Item'}</td><td style="padding: 8px 0;">${params.itemName}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Amount Paid</td><td style="padding: 8px 0; color: #C9A84C;">${formattedAmount}</td></tr>
        </table>
      </div>
    `,
  };

  const mailToClient = {
    from: `"Kosmic Trinity" <${process.env.GMAIL_USER}>`,
    to: params.clientEmail,
    subject: `${isService ? 'Booking Confirmed' : 'Order Received'} — ${params.itemName}`,
    html: `
      <div style="font-family: Georgia, serif; background: #1a0508; color: #f5e8c8; padding: 32px; border-radius: 8px;">
        <h2 style="color: #C9A84C;">${isService ? 'Booking Confirmed ✦' : 'Order Received ✦'}</h2>
        <p>Dear ${params.clientName},</p>
        <p>Your payment of <strong style="color: #C9A84C;">${formattedAmount}</strong> for <strong>${params.itemName}</strong> has been received.</p>
        ${isService ? `
        <p style="margin-top: 24px;">Please choose a convenient date and time for your session using the link below. Once booked, we'll see it on our calendar and confirm your session.</p>
        <a href="${APPOINTMENT_URL}" style="display:inline-block; margin-top:12px; padding: 12px 28px; background: #C9A84C; color: #1a0508; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Book Your Session Time &rarr;
        </a>` : `
        <p style="margin-top: 24px;">We will reach out within 24 hours to confirm your order and arrange delivery details.</p>`}
        <p style="margin-top: 32px; color: #aaa; font-size: 13px;">
          Questions? Reply to this email or reach us at kosmictrinity@gmail.com.<br/>
          With cosmic love,<br/>
          <strong>The Kosmic Trinity</strong>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailToKosmic);
  await transporter.sendMail(mailToClient);
}

export async function sendEnquiry(params: {
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mail = {
    from: `"Kosmic Trinity Website" <${process.env.GMAIL_USER}>`,
    to: 'kosmictrinity@gmail.com',
    replyTo: params.email,
    subject: `New Enquiry from ${params.name}${params.company ? ` (${params.company})` : ''}`,
    html: `
      <div style="font-family: Georgia, serif; background: #1a0508; color: #f5e8c8; padding: 32px; border-radius: 8px;">
        <h2 style="color: #C9A84C;">New Enquiry Received ✦</h2>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color:#aaa;">Name</td><td style="padding: 8px 0;">${params.name}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Email</td><td style="padding: 8px 0;">${params.email}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Phone</td><td style="padding: 8px 0;">${params.phone || '—'}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Interest</td><td style="padding: 8px 0;">${params.productInterest || '—'}</td></tr>
          <tr><td style="padding: 8px 0; color:#aaa;">Message</td><td style="padding: 8px 0;">${params.message || '—'}</td></tr>
        </table>
      </div>
    `,
  };

  await transporter.sendMail(mail);
}
