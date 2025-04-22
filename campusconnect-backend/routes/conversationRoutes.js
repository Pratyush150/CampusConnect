// routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const { createConversation, getConversationsByUser, getMessagesByConversation, sendMessage } = require('../controllers/conversationController');

// ✅ Route to create a new conversation between two users
router.post('/create', createConversation);

// ✅ Route to get all conversations for a user
router.get('/user/:userId', getConversationsByUser);

// ✅ Route to get messages for a specific conversation
router.get('/conversation/:conversationId/messages', getMessagesByConversation);

// ✅ Route to send a new message in a conversation
router.post('/conversation/:conversationId/message', sendMessage);

module.exports = router;
