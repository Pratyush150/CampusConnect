// routes/campusWallRoutes.js
import express from "express";
import { getAllPosts, createPost } from "../controllers/campusWallController.js"; // Import controller functions

const router = express.Router();

// GET all posts (latest first)
router.get("/", getAllPosts); // Delegate to the controller's getAllPosts function

// POST a new post
router.post("/", createPost); // Delegate to the controller's createPost function

export default router;

