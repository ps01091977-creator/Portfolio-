import transporter from '../config/nodemailer.js';

// RFC 5322 Compliant Email regex check
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Inputs validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Sender name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Sender email address is required.' });
    }
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please write a message before sending.' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const dateStamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // 2. Configure mail options
    const mailOptions = {
      from: `"${trimmedName}" <${process.env.EMAIL_USER}>`, // Send through authenticated account
      replyTo: trimmedEmail, // Easy reply directly to the sender
      to: 'ps01091977@gmail.com', // Personal recipient address
      subject: `New Contact Submission from ${trimmedName}`,
      text: `
New Portfolio Contact Request:
-------------------------------------
Name: ${trimmedName}
Email: ${trimmedEmail}
Date/Time (IST): ${dateStamp}
-------------------------------------
Message:
${trimmedMessage}
      `,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #06070a; padding: 2rem; color: #cbd5e1; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <h2 style="font-family: 'Space Grotesk', sans-serif; color: #ffffff; border-bottom: 2px solid #8b5cf6; padding-bottom: 0.75rem; margin-top: 0; font-size: 1.5rem;">
            📬 New Contact Request
          </h2>
          
          <div style="background-color: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.03); margin: 1.5rem 0;">
            <p style="margin: 0 0 0.6rem 0; font-size: 0.95rem;">
              <strong style="color: #06b6d4;">Sender Name:</strong> ${trimmedName}
            </p>
            <p style="margin: 0 0 0.6rem 0; font-size: 0.95rem;">
              <strong style="color: #06b6d4;">Sender Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #8b5cf6; text-decoration: none;">${trimmedEmail}</a>
            </p>
            <p style="margin: 0; font-size: 0.95rem;">
              <strong style="color: #06b6d4;">Date & Time (IST):</strong> ${dateStamp}
            </p>
          </div>

          <h3 style="color: #ffffff; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem; font-family: 'Space Grotesk', sans-serif;">
            Message Content:
          </h3>
          <div style="background-color: rgba(6, 182, 212, 0.03); border-left: 4px solid #06b6d4; padding: 1.2rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem; font-size: 0.98rem; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${trimmedMessage}</div>
          
          <div style="font-size: 0.78rem; color: #64748b; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem; margin-top: 2rem;">
            This email was sent dynamically from your MERN Portfolio Server.
          </div>
        </div>
      `
    };

    // 3. Send email via Nodemailer
    if (process.env.EMAIL_PASS === 'your_gmail_app_password_here' || !process.env.EMAIL_PASS) {
      console.log('--- EMAIL MOCKED (App Password not configured) ---');
      console.log(`From: ${trimmedName} <${trimmedEmail}>`);
      console.log(`Message: ${trimmedMessage}`);
      console.log('--------------------------------------------------');
    } else {
      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Mail delivery failure:', error);
    
    // Return a more descriptive error if it's an authentication issue
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Gmail Authentication failed. Please check your App Password in the .env file.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later or contact directly.'
    });
  }
};
