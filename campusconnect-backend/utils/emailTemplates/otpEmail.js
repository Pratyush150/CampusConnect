const otpEmailTemplate = (name, otp, otpUrl) => {
  return `
    <div>
      <h2>Hello ${name},</h2>
      <p>Your OTP for CampusConnect is <strong>${otp}</strong>.</p>
      <p><a href="${otpUrl}">Click here to verify your email</a></p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;
};

export default otpEmailTemplate;
