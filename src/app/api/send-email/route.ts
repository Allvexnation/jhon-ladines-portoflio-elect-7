import { NextRequest, NextResponse } from 'next/server';
import { generateEmailTemplate } from '@/templates/Emailtemplate';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone, address } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const senderName = process.env.SENDER_NAME;
    const senderEmail = process.env.SENDER_EMAIL;
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!senderName || !senderEmail || !brevoApiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const htmlContent = generateEmailTemplate({ name, email, subject, message, phone, address });

    const emailPayload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: senderEmail,
          name: senderName,
        },
      ],
      subject: `Contact Form: ${subject}`,
      htmlContent: htmlContent,
      replyTo: {
        email: email,
        name: name,
      },
    };

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    const data = await brevoResponse.json();

    return NextResponse.json({ success: true, messageId: data.messageId }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
