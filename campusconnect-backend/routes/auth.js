import express from "express";
import upload from "../middleware/multerUpload.js";
import {
  registerUser,
  loginUser,
  verifyEmail,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", upload.single("collegeIdImage"), registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/refresh-token", refreshAccessToken);

export default router;








