const otpEmailTemplate = (name, otp, otpUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f7fa;">
      <h2 style="color: #333;">Hello ${name},</h2>
      <p style="font-size: 16px; color: #555;">Your OTP for CampusConnect is <strong style="font-size: 18px; color: #007BFF;">${otp}</strong>.</p>
      <p style="font-size: 16px; color: #555;">Click the link below to verify your email:</p>
      <p><a href="${otpUrl}" style="color: white; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Now</a></p>
      <p style="font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
    </div>
  `;
};

export default otpEmailTemplate;
