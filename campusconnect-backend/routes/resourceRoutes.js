import express from 'express';
import { uploadResource, getResources } from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, uploadResource); // Only logged-in users can upload
router.get('/', getResources);            // Public fetch route

export default router;
