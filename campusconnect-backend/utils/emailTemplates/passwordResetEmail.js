const passwordResetEmail = ({ name, resetUrl }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset - CampusConnect</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px; margin: 0;">
        <div style="background-color: white; max-width: 600px; margin: auto; padding: 40px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); text-align: center;">
          <h2 style="margin-top: 0; font-size: 24px; color: #4f46e5;">Password Reset Request for CampusConnect</h2>
          <p style="font-size: 16px; color: #333;">Hello, ${name}!</p>
          <p style="font-size: 16px; color: #333;">We received a request to reset your password. Please click the button below to set a new one.</p>
          <a href="${resetUrl}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; font-size: 16px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Reset Password</a>
          <p style="margin-top: 20px; font-size: 14px; color: #333;">If the button doesn’t work, copy and paste the following link into your browser:</p>
          <p><a href="${resetUrl}" style="color: #4f46e5; text-decoration: none;">${resetUrl}</a></p>
          <div style="margin-top: 30px; font-size: 12px; color: #888;">
            <p>If you didn’t request a password reset, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default passwordResetEmail;

  