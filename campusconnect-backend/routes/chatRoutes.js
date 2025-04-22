// routes/chatRoutes.js
import express from 'express';
import * as chatController from '../controllers/chatController.js';

const router = express.Router();

// Create new conversation
router.post('/conversations', chatController.createConversation);

// Get conversations for a user
router.get('/conversations/:userId', chatController.getConversationsByUser);

// Send new message
router.post('/messages', chatController.sendMessage);

// Get messages of a conversation
router.get('/messages', chatController.getMessages);

export default router;
