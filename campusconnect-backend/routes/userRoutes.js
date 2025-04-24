// routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // Protect middleware to ensure only authorized users can access certain routes
import {
  registerUser,
  loginUser,
  getAllUsers,
  getMe,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route to get all users (protected, requires JWT)
router.get("/", protect, getAllUsers); // This route will be protected, only accessible to authorized users

// Route to get the logged-in user's profile (protected)
router.get("/me", protect, getMe); // This route is protected, will return the logged-in user's profile

// Route to update the logged-in user's profile (protected)
router.put("/profile", protect, updateUserProfile); // This route is protected, allows user to update their profile

export default router;


