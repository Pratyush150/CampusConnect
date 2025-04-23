import express from "express";
import upload from "../middleware/multerUpload.js";
import {
  registerUser,
  loginUser,
  verifyEmail,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = express.Router();

// @route   POST /auth/register
// @desc    Register user (with college ID image upload via multer)
// @access  Public
router.post("/register", upload.single("collegeIdImage"), registerUser);

// @route   POST /auth/login
// @desc    Login user and return access + refresh tokens
// @access  Public
router.post("/login", loginUser);

// @route   GET /auth/verify/:token
// @desc    Email verification link handler
// @access  Public
router.get("/verify/:token", verifyEmail);

// @route   POST /auth/refresh-token
// @desc    Use refresh token to get a new access token
// @access  Public
router.post("/refresh-token", refreshAccessToken);

export default router;








