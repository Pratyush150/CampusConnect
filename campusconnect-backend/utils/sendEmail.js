import nodemailer from "nodemailer";

// Create a transporter using SMTP configuration from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587, // Default to 587 if not specified
  secure: parseInt(process.env.EMAIL_PORT) === 465, // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email with HTML and optional text fallback
 * @param {Object} param0 - The email parameters
 * @param {string} param0.to - Recipient email
 * @param {string} param0.subject - Email subject
 * @param {string} param0.html - HTML body
 * @param {string} [param0.text] - Optional plain text fallback
 */
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"CampusConnect" <no-reply@campusconnect.com>`,  // Default email from address
      to,
      subject,
      html,
      text: text || "Your email client does not support HTML.",  // Plain text fallback
    });

    console.log(`✅ Email sent: ${info.messageId} to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}: ${err.message}`);
    // Optional: Implement retry logic or fallback to another service
    throw new Error("Email sending failed");
  }
};

export default sendEmail;

