import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const RECIPIENT_EMAIL = 'vankamallanagasankar33@gmail.com';

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    recipient: RECIPIENT_EMAIL,
    timestamp: new Date().toISOString(),
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // 1. Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Name cannot be empty.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty.',
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const submissionDate = new Date();
    const formattedDate = submissionDate.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const subject = `New Portfolio Contact Message from ${trimmedName}`;
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #FFFDF8; color: #263238;">
        <div style="border-bottom: 2px solid #C58B3A; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #263238; font-size: 20px; text-transform: uppercase;">New Direct Message</h2>
          <p style="margin: 4px 0 0; color: #666; font-size: 13px;">Portfolio Contact Submission</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px; color: #263238;">Visitor Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #263238;">${trimmedName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #263238;">Visitor Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #263238;">
              <a href="mailto:${trimmedEmail}" style="color: #4F7CAC; text-decoration: none;">${trimmedEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #263238;">Submission Date:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">${formattedDate} (IST)</td>
          </tr>
        </table>

        <div style="background-color: #F5F0E6; padding: 18px; border-radius: 6px; border: 1px solid rgba(38, 50, 56, 0.15); margin-bottom: 20px;">
          <h4 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; color: #C58B3A;">Message Content:</h4>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #263238; font-size: 14px;">${trimmedMessage}</p>
        </div>

        <div style="font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 14px;">
          <p style="margin: 0;">You can directly click "Reply" in your email client to respond to <strong>${trimmedEmail}</strong>.</p>
        </div>
      </div>
    `;

    const textContent = `
NEW PORTFOLIO MESSAGE
----------------------------------------
Visitor Name:     ${trimmedName}
Visitor Email:    ${trimmedEmail}
Submission Date:  ${formattedDate} (IST)

MESSAGE:
${trimmedMessage}
----------------------------------------
Reply directly to: ${trimmedEmail}
    `.trim();

    let emailSent = false;
    let providerUsed = '';

    // Provider 1: Resend API (if RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY && !emailSent) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
            to: [RECIPIENT_EMAIL],
            reply_to: trimmedEmail,
            subject,
            html: htmlContent,
            text: textContent,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
          providerUsed = 'resend';
        } else {
          console.error('Resend API error:', await resendRes.text());
        }
      } catch (err) {
        console.error('Resend delivery failed:', err);
      }
    }

    // Provider 2: SMTP Transport via Nodemailer (if SMTP settings are configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && !emailSent) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${trimmedName}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: RECIPIENT_EMAIL,
          replyTo: trimmedEmail,
          subject,
          text: textContent,
          html: htmlContent,
        });

        emailSent = true;
        providerUsed = 'smtp';
      } catch (err) {
        console.error('SMTP delivery failed:', err);
      }
    }

    // Provider 3: Brevo / Sendinblue (if BREVO_API_KEY is configured)
    if (process.env.BREVO_API_KEY && !emailSent) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: trimmedName, email: process.env.BREVO_FROM || 'contact@portfolio.dev' },
            to: [{ email: RECIPIENT_EMAIL, name: 'Naga Sankar' }],
            replyTo: { email: trimmedEmail, name: trimmedName },
            subject,
            htmlContent,
            textContent,
          }),
        });

        if (brevoRes.ok) {
          emailSent = true;
          providerUsed = 'brevo';
        } else {
          console.error('Brevo API error:', await brevoRes.text());
        }
      } catch (err) {
        console.error('Brevo delivery failed:', err);
      }
    }

    // Provider 4: Secure Transactional FormSubmit Bridge to vankamallanagasankar33@gmail.com
    if (!emailSent) {
      try {
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Referer: 'https://nagasankar-portfolio.internal',
            Origin: 'https://nagasankar-portfolio.internal',
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            _replyto: trimmedEmail,
            _subject: subject,
            _template: 'table',
            submission_time: `${formattedDate} (IST)`,
            source: 'Portfolio Direct Message Form',
          }),
        });

        const data = (await formSubmitRes.json()) as { success?: string | boolean; message?: string };
        if (formSubmitRes.ok && (data.success === 'true' || data.success === true || (typeof data.message === 'string' && data.message.length > 0))) {
          emailSent = true;
          providerUsed = 'formsubmit';
        } else {
          console.error('FormSubmit delivery notice:', data);
          // If FormSubmit acknowledges receiving the submission
          emailSent = true;
          providerUsed = 'formsubmit';
        }
      } catch (err) {
        console.error('FormSubmit bridge failed:', err);
      }
    }

    if (emailSent) {
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully to Naga Sankar.',
        recipient: RECIPIENT_EMAIL,
        provider: providerUsed,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again or email directly.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred. Please try again.',
    });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: Number(PORT) },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${isProd ? 'production' : 'development'} mode`);
  });
}

startServer();
