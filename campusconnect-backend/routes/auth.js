import express from "express";
import { authLimiter } from "../middleware/rateLimiter.js";
import {
  registerUser,
  loginUser,
  verifyEmail,
  refreshAccessToken,
  resendVerificationEmail,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", authLimiter, registerUser);

// @route   POST /api/auth/login
// @desc    Login user and return tokens
router.post("/login", authLimiter, loginUser);

// @route   GET /api/auth/verify-email?token=
// @desc    Verify email using token from email
router.get("/verify-email", verifyEmail);

// @route   POST /api/auth/refresh-token
// @desc    Get new access token using refresh token
router.post("/refresh-token", refreshAccessToken);

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
router.post("/resend-verification", authLimiter, resendVerificationEmail);

// @route   POST /api/auth/logout
// @desc    Logout user and clear refresh token
router.post("/logout", logoutUser);

export default router;




