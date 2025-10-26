import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  console.log('=== API ROUTE HIT ===');
  
  try {
    const { name, email, subject, message } = await request.json();
    console.log('Form data received:', { name, email, subject });
    
    // Check environment variables
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing environment variables!');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Create transporter
    console.log('Creating transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Verify connection
    console.log('Verifying connection...');
    await transporter.verify();
    console.log('Connection verified!');
    
    // Send email
    console.log('Sending email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'timmahoney2000@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    
    console.log('Email sent successfully!', info.messageId);
    
    return NextResponse.json({ success: true });
 } catch (error) {
  console.error('=== ERROR ===');
  console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
  console.error('Error message:', error instanceof Error ? error.message : String(error));
  console.error('Full error:', error);
  return NextResponse.json(
    { 
      error: 'Failed to send message', 
      details: error instanceof Error ? error.message : 'Unknown error'
    },
    { status: 500 }
  );
}
}