// controllers/chatController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Create a new conversation (between 2 users)
export const createConversation = async (req, res) => {
  const { userIds } = req.body; // Expects an array of two userIds

  if (!userIds || userIds.length !== 2) {
    return res.status(400).json({ message: "Two user IDs required." });
  }

  try {
    // 🔁 Check if conversation already exists between these users
    const existing = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: { in: userIds },
          },
        },
      },
      include: { participants: true },
    });

    if (existing) return res.status(200).json(existing);

    // ✅ Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: userIds.map(id => ({ id })),
        },
      },
      include: {
        participants: true,
      },
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.error("❌ createConversation error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all conversations of a user
export const getConversationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { id: userId },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const result = conversations.map(conv => {
      const chatPartner = conv.participants.find(u => u.id !== userId);
      return {
        id: conv.id,
        updatedAt: conv.updatedAt,
        lastMessage: conv.messages[0],
        chatPartner,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("❌ getConversationsByUser error:", error);
    res.status(500).json({ message: "Failed to fetch conversations." });
  }
};

// ✅ Send a new message (Socket.IO ready)
export const sendMessage = async (req, res) => {
  const { content, conversationId, senderId } = req.body;
  const io = req.app.get("io");

  if (!content || !conversationId || !senderId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
      },
    });

    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    io.to(conversationId).emit("receiveMessage", message);

    res.status(201).json(message);
  } catch (error) {
    console.error("❌ sendMessage error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all messages from a conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.query;

  if (!conversationId) {
    return res.status(400).json({ message: "conversationId is required." });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    res.json(messages);
  } catch (error) {
    console.error("❌ getMessages error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Optional: Mark message as seen
export const markMessageAsSeen = async (req, res) => {
  const { id } = req.params;
  const io = req.app.get("io");

  try {
    const updated = await prisma.message.update({
      where: { id },
      data: { seen: true },
    });

    io.to(updated.conversationId).emit("messageSeen", { messageId: id });
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ markMessageAsSeen error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Optional: File upload handler
export const handleFileUpload = async (req, res) => {
  const { senderId, receiverId, roomId } = req.body;
  const file = req.file;
  const io = req.app.get("io");

  if (!file) return res.status(400).json({ message: "No file uploaded." });

  try {
    const message = await prisma.message.create({
      data: {
        fileUrl: `/uploads/${file.filename}`,
        senderId,
        receiverId,
        roomId,
        content: null,
        conversationId: roomId,
      },
    });

    await prisma.conversation.update({
      where: { id: roomId },
      data: { updatedAt: new Date() },
    });

    io.to(roomId).emit("receiveMessage", message);
    res.status(201).json(message);
  } catch (error) {
    console.error("❌ handleFileUpload error:", error);
    res.status(500).json({ error: error.message });
  }
};
