// routes/eventRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Route to create a new event (protected route)
router.post("/events", protect, createEvent);

// Route to get all events (protected route)
router.get("/events", protect, getEvents);

// Route to update an event by its ID (protected route)
router.put("/events/:id", protect, updateEvent);

// Route to delete an event by its ID (protected route)
router.delete("/events/:id", protect, deleteEvent);

export default router;


