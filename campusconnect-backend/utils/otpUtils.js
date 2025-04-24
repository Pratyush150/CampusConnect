// OTP Generation utility
export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    return otp.toString();
  };
  
  // OTP Validation utility (optional if needed)
  export const validateOTP = (otp) => {
    return /^\d{6}$/.test(otp); // Ensures OTP is exactly 6 digits
  };
  