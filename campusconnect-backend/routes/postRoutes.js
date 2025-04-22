// routes/postRoutes.js
import express from 'express';
import { createPost, getAllPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to create a post
router.post('/', protect, createPost);

// Public route to get posts with pagination (e.g., /posts?page=1&limit=10)
router.get('/', getAllPosts);

export default router;

