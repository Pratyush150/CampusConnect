// routes/mentorRoutes.js

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createMentorProfile, getMentors } from "../controllers/mentorController.js";

const router = express.Router();

// Route to create a mentor profile
router.post("/create", protect, createMentorProfile);

// Route to get a list of mentors
router.get("/", getMentors);

export default router;
