// routes/resourceRoutes.js
import express from 'express';
import { uploadResource, getResources } from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to upload a resource, only accessible to authenticated users
router.post('/', protect, uploadResource);

// Route to get all resources, public access with pagination
router.get('/', getResources);

export default router;

