// controllers/chatController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Create a new conversation
export const createConversation = async (req, res) => {
  const { userIds } = req.body; // List of user IDs to start a conversation with

  try {
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: userIds.map(id => ({ id }))
        },
      },
    });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Send a new message
export const sendMessage = async (req, res) => {
  const { content, conversationId, senderId } = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
      },
    });

    // Update the conversation's updatedAt timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all messages in a conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.query;

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

