import express from 'express';
import {
  createConversation,
  getConversationsByUser,
  sendMessage,
  getMessages,
  markMessageAsSeen
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/conversations', createConversation);
router.get('/conversations/:userId', getConversationsByUser);

router.post('/messages', sendMessage);
router.get('/messages', getMessages); // expects ?conversationId=xyz
router.post('/messages/:id/seen', markMessageAsSeen);

// router.post('/upload', uploadMiddleware.single('file'), handleFileUpload); // Uncomment if needed later

export default router;
