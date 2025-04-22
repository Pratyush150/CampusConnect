import express from "express";
import upload from "../middleware/multerUpload.js";
import {
  registerUser,
  loginUser,
  verifyEmail,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = express.Router();

// Route for user registration
router.post("/register", upload.single("collegeIdImage"), registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for email verification
router.get("/verify/:token", verifyEmail);

// Route to refresh access token using refresh token
router.post("/refresh-token", refreshAccessToken);

export default router;







