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

// User Registration Route
// Protect with rate limiter to prevent brute-force attempts
router.post("/register", authLimiter, registerUser);

// User Login Route
// Rate-limited login to avoid abuse
router.post("/login", authLimiter, loginUser);

// Email Verification Route
// A GET request to verify the user's email address
router.get("/verify-email", verifyEmail);

// OTP Verification Route
// A GET request to verify the OTP sent during email verification
router.get("/verify-otp", verifyOTP);

// Resend OTP Route
// Allows the user to resend an OTP for email verification
router.post("/resend-otp", authLimiter, resendOTP);

// Refresh Token Route
// Allows the user to refresh the access token, used for session renewal
router.post("/refresh-token", refreshAccessToken);

// Resend Verification Email Route
// Allows a user to request another email verification if the first one was missed
router.post("/resend-verification", authLimiter, resendVerificationEmail);

// User Logout Route
// Logs the user out by clearing the session or token
router.post("/logout", logoutUser);

export default router;










