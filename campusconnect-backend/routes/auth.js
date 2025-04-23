import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = express.Router();

  // ⬅️ Rerouter.post("/register", registerUser);moved multer upload
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/refresh-token", refreshAccessToken);

export default router;





