import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Create a new conversation (between 2 users)
export const createConversation = async (req, res) => {
  const { userIds } = req.body; // Expects an array of two userIds

  if (!userIds || userIds.length !== 2) {
    return res.status(400).json({ message: "Two user IDs required." });
  }

  try {
    // 🔁 Check if conversation already exists (exact same 2 users)
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

    // ✅ Else create a new one
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: userIds.map((id) => ({ id })),
        },
      },
      include: {
        participants: true,
      },
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
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
      orderBy: {
        updatedAt: "desc",
      },
    });

    // 💬 Attach chat partner (other user) to each conversation
    const filtered = conversations.map((conv) => {
      const chatPartner = conv.participants.find((u) => u.id !== userId);
      return {
        id: conv.id,
        updatedAt: conv.updatedAt,
        lastMessage: conv.messages[0],
        chatPartner,
      };
    });

    res.json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch conversations." });
  }
};

// ✅ Send a new message
export const sendMessage = async (req, res) => {
  const { content, conversationId, senderId } = req.body;
  const { io } = req; // Get Socket.IO instance

  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
      },
    });

    // 🔁 Update the conversation's timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    // 📢 Emit to socket room
    io.to(conversationId).emit("receiveMessage", message);

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all messages from a conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.query;

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
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

