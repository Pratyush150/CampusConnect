// Generate a 6-digit OTP
export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};

// Optional: Add OTP validation logic (in case it's needed later)
export const validateOTP = (inputOtp, storedOtp) => {
    return inputOtp === storedOtp;
};
