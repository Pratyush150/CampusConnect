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

// Email Verification (with named parameter)
router.post("/verify-email/:token", verifyEmail); // ✅ Fixed

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











