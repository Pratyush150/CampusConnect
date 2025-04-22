import express from 'express';
import {
  createConversation,
  getConversationsByUser,
  sendMessage,
  getMessages,
  markMessageAsSeen,
  handleFileUpload
} from '../controllers/chatController.js';

import uploadMiddleware from '../middleware/uploadMiddleware.js'; // if using multer

const router = express.Router();

router.post('/conversations', createConversation);
router.get('/conversations/:userId', getConversationsByUser);

router.post('/messages', sendMessage);
router.get('/messages', getMessages); // expects ?conversationId=xyz
router.post('/messages/:id/seen', markMessageAsSeen);

router.post('/upload', uploadMiddleware.single('file'), handleFileUpload);

export default router;
