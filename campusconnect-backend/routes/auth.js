import express from "express";
import { authLimiter, refreshLimiter } from "../middleware/rateLimiter.js";
import {
  registerUser,
  loginUser,
  verifyEmail,
  verifyOTP,
  resendOTP,
  refreshAccessToken,
  resendVerificationEmail,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// Registration & Login
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);

// Email Verification (POST for API, GET for email link if needed)
router.post("/verify-email", verifyEmail);
// router.get("/verify-email", verifyEmail); // Uncomment if you want GET for email links

// OTP Verification
router.post("/verify-otp", verifyOTP);

// Resend OTP & Verification Email
router.post("/resend-otp", authLimiter, resendOTP);
router.post("/resend-verification", authLimiter, resendVerificationEmail);

// Refresh Token
router.post("/refresh-token", refreshLimiter, refreshAccessToken);

// Logout
router.post("/logout", logoutUser);

export default router;











