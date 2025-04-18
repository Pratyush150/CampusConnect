import express from 'express';
import { createPost, getAllPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPost); // Protected route to create a post
router.get('/', getAllPosts);         // Public route to view posts

export default router;
