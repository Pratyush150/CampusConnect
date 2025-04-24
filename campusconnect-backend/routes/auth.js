import express from "express";
import { authLimiter } from "../middleware/rateLimiter.js";
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

// User Registration Routes
router.post("/register", authLimiter, registerUser);

// User Login Routes
router.post("/login", authLimiter, loginUser);

// Email Verification Route
router.get("/verify-email", verifyEmail);

// OTP Verification Route
router.get("/verify-otp", verifyOTP); // OTP verification route

// Resend OTP Route (for email verification)
router.post("/resend-otp", authLimiter, resendOTP); // Resend OTP route

// Refresh Token Route (to get new access token)
router.post("/refresh-token", refreshAccessToken);

// Resend Verification Email Route
router.post("/resend-verification", authLimiter, resendVerificationEmail);

// User Logout Route
router.post("/logout", logoutUser);

export default router;










