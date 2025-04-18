import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // Keep only this line
import { createEvent, getEvents } from "../controllers/eventController.js";

import {
  registerUser,
  loginUser,
  getAllUsers,
  getMe,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers); // temporary
router.get("/me", protect, getMe); // get logged-in user
router.put("/profile", protect, updateUserProfile); // update profile

// Route to create an event
router.post("/events", protect, createEvent);

// Route to get all events (with optional filters)
router.get("/events", protect, getEvents);

export default router;

