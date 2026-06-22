import nodemailer from 'nodemailer';

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
      <div style="font-family: Georgia, serif; background: #1a0508; color: #f5e8c8; padding: 32px; border-radius: 8px;">
        <h2 style="color: #C9A84C;">Booking Confirmed ✦</h2>
        <p>Dear ${params.clientName},</p>
        <p>Your payment of <strong style="color: #C9A84C;">${formattedAmount}</strong> for <strong>${params.serviceName}</strong> has been received.</p>
        <p style="margin-top: 24px;">Please use the link below to choose your preferred date and time:</p>
        <a href="${params.calendarLink}" style="display:inline-block; margin-top:12px; padding: 12px 24px; background: #C9A84C; color: #1a0508; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Book Your Date &amp; Time
        </a>
        <p style="margin-top: 32px; color: #aaa; font-size: 13px;">
          If you have any questions, reply to this email or reach out at kosmictrinity@gmail.com.<br/>
          With cosmic love,<br/>
          <strong>thekosmictrinity</strong>
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
  const CALENDAR_URL = 'https://calendar.google.com/calendar/appointments';

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
        <p style="margin-top: 24px;">Please use the link below to choose your preferred date and time:</p>
        <a href="${CALENDAR_URL}" style="display:inline-block; margin-top:12px; padding: 12px 24px; background: #C9A84C; color: #1a0508; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Book Your Date &amp; Time
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
