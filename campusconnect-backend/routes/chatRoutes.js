import express from 'express';
import {
  createConversation,
  getConversationsByUser,
  sendMessage,
  getMessages,
  markMessageAsSeen
} from '../controllers/chatController.js';

const router = express.Router();

// Route to create a new conversation
router.post('/conversations', createConversation);

// Route to get all conversations of a specific user
router.get('/conversations/:userId', getConversationsByUser);

// Route to send a message in a conversation
router.post('/messages', sendMessage);

// Route to get all messages in a conversation
router.get('/messages', getMessages); // expects ?conversationId=xyz

// Route to mark a message as seen
router.post('/messages/:id/seen', markMessageAsSeen);

// Uncomment if file upload functionality is needed
// router.post('/upload', uploadMiddleware.single('file'), handleFileUpload); // Uncomment if needed later

export default router;
