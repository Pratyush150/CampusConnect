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

// Function to send email
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const emailOptions = {
      from: process.env.EMAIL_FROM || `"CampusConnect" <no-reply@campusconnect.com>`,
      to,
      subject,
      html,
      text: text || "Your email client does not support HTML.",
    };

    // Send email using the transporter
    const info = await transporter.sendMail(emailOptions);

    console.log(`✅ Email sent: ${info.messageId} to ${to}`);
    return info; // Return email info for further processing if needed
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}: ${err.message}`);

    // Optionally, include additional details in the error for debugging
    throw new Error(`Email sending failed to ${to}: ${err.message}`);
  }
};

export default sendEmail;


