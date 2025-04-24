// Generate a 6-digit OTP
export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
    return otp.toString(); // Returns OTP as a string for consistency
  };
  
  // Optional: OTP validation logic (compares the input OTP with the stored OTP)
  export const validateOTP = (inputOtp, storedOtp) => {
    return inputOtp === storedOtp; // Returns true if OTPs match, false otherwise
  };
  