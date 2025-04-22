// routes/mentorRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createMentorProfile,
  getMentors,
} from "../controllers/mentorController.js";

const router = express.Router();

// Create mentor profile
router.post("/create", protect, createMentorProfile);

// Get mentor list with optional filters
router.get("/", getMentors);

export default router;
