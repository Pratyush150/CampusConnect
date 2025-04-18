// routes/chatRoutes.js

import express from 'express';
import * as chatController from '../controllers/chatController.js'; // ✅ Use named import
const router = express.Router();

// ✅ Route to create a new conversation
router.post('/conversations', chatController.createConversation);

// ✅ Route to send a new message
router.post('/messages', chatController.sendMessage);

// ✅ Route to get messages from a conversation
router.get('/messages', chatController.getMessages);

export default router;
