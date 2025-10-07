import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * Handles contact form submissions
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData = {
      name,
      email,
      phone: body.phone || '',
      company: body.company || '',
      subject,
      message,
      userId: body.userId || 'guest',
      userEmail: body.userEmail || email,
      userAuthenticated: body.userAuthenticated || false,
      timestamp: body.timestamp || new Date().toISOString(),
      status: 'new', // new, read, replied, closed
    };

    // Log the submission (for development)
    console.log('📧 New Contact Form Submission:');
    console.log('================================');
    console.log(`Name: ${contactData.name}`);
    console.log(`Email: ${contactData.email}`);
    console.log(`Phone: ${contactData.phone || 'Not provided'}`);
    console.log(`Company: ${contactData.company || 'Not provided'}`);
    console.log(`Subject: ${contactData.subject}`);
    console.log(`Message: ${contactData.message}`);
    console.log(`User ID: ${contactData.userId}`);
    console.log(`Authenticated: ${contactData.userAuthenticated}`);
    console.log(`Timestamp: ${contactData.timestamp}`);
    console.log('================================\n');

    // ============================================
    // OPTION 1: Save to Firebase Firestore
    // ============================================
    // Uncomment this section to save to Firebase
    /*
    const { getFirestore, collection, addDoc } = require('firebase/firestore');
    const { db } = require('@/lib/firebase'); // or initialize here

    const docRef = await addDoc(collection(db, 'contact_submissions'), contactData);
    console.log('✅ Saved to Firestore with ID:', docRef.id);
    */

    // ============================================
    // OPTION 2: Send Email Notification
    // ============================================
    // You can integrate with services like:
    // - SendGrid
    // - AWS SES
    // - Nodemailer
    // - Resend
    // - Mailgun

    /*
    // Example with SendGrid:
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'your-email@example.com',
      from: 'noreply@gemservice.com',
      subject: `New Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company || 'Not provided'}

        Subject: ${subject}

        Message:
        ${message}

        User ID: ${userId}
        Authenticated: ${userAuthenticated}
        Timestamp: ${timestamp}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>User ID: ${userId}</small></p>
        <p><small>Authenticated: ${userAuthenticated}</small></p>
        <p><small>Timestamp: ${timestamp}</small></p>
      `,
    };

    await sgMail.send(msg);
    */

    // ============================================
    // OPTION 3: Webhook to External Service
    // ============================================
    /*
    await fetch('https://your-webhook-url.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    */

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
        data: {
          id: Date.now().toString(), // In production, use the actual DB ID
          timestamp: contactData.timestamp,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error processing contact form:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact API is running',
    timestamp: new Date().toISOString(),
  });
}
