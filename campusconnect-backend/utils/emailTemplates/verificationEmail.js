const verificationEmail = ({ name, verificationUrl }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification - CampusConnect</title>
        <style>
          /* Mobile-friendly Styles */
          @media (max-width: 600px) {
            body {
              padding: 15px;
            }
            .email-container {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px; margin: 0;">
        <div class="email-container" style="background-color: white; max-width: 600px; margin: auto; padding: 40px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); text-align: center;">
          <h2 style="margin-top: 0; font-size: 24px; color: #4f46e5;">Welcome to CampusConnect, ${name} 👋</h2>
          <p style="font-size: 16px; color: #333;">You're almost there! Please verify your email address by clicking the button below.</p>
          <a href="${verificationUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 20px; padding: 12px 24px; font-size: 16px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px;">Verify Email</a>
          <p style="margin-top: 20px; font-size: 14px; color: #333;">If the button doesn’t work, copy and paste the following link into your browser:</p>
          <p><a href="${verificationUrl}" target="_blank" rel="noopener noreferrer" style="color: #4f46e5;">${verificationUrl}</a></p>
          <div style="margin-top: 30px; font-size: 12px; color: #888;">
            <p>If you did not create a CampusConnect account, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default verificationEmail;
