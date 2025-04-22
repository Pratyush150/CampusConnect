import nodemailer from "nodemailer";

// Create a transporter using Gmail service and credentials from environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address
    pass: process.env.EMAIL_PASS,  // App Password (not your actual Gmail password)
  },
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"CampusConnect" <${process.env.EMAIL_USER}>`,  // Sender address
    to,  // Recipient address
    subject,  // Subject of the email
    html,  // HTML content of the email
  };

  // Send email and handle potential errors
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;

