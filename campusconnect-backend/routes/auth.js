// ✅ Updated and enhanced auth.js (authRoutes.js)
import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = express.Router();

// ✅ Register route added back
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/refresh-token", refreshAccessToken);

export default router;




