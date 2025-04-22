const db = require('../db'); // Assuming you have a database setup file

// ✅ Create a new conversation between two users (with validation)
const createConversation = async (req, res) => {
  const { userId, otherUserId } = req.body; // userId and otherUserId come from the body

  // ✅ Validate input
  if (!userId || !otherUserId) {
    return res.status(400).json({ message: "Both userId and otherUserId are required." });
  }

  try {
    // 🔄 Check if the conversation already exists
    const existingConversation = await db.query(`
      SELECT * FROM conversations
      WHERE (user_id = $1 AND other_user_id = $2)
         OR (user_id = $2 AND other_user_id = $1);
    `, [userId, otherUserId]);

    if (existingConversation.rows.length > 0) {
      return res.status(200).json(existingConversation.rows[0]); // Conversation exists
    }

    // ✅ If no existing conversation, create a new one
    const result = await db.query(`
      INSERT INTO conversations (user_id, other_user_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [userId, otherUserId]);

    res.status(201).json(result.rows[0]); // Return the newly created conversation
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create conversation." });
  }
};

// ✅ Get all conversations for a user, with details of the last message
const getConversationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // ✅ Fetch all conversations for the user
    const result = await db.query(`
      SELECT * FROM conversations
      WHERE user_id = $1 OR other_user_id = $1;
    `, [userId]);

    // ✅ For each conversation, fetch the latest message
    const conversations = await Promise.all(result.rows.map(async (conversation) => {
      const lastMessageResult = await db.query(`
        SELECT * FROM messages
        WHERE conversation_id = $1
        ORDER BY created_at DESC
        LIMIT 1;
      `, [conversation.id]);

      // Return conversation data along with the last message
      return {
        ...conversation,
        lastMessage: lastMessageResult.rows[0] || null,
      };
    }));

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch conversations." });
  }
};

// ✅ Get all messages from a specific conversation
const getMessagesByConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    // ✅ Fetch messages for the given conversation ID
    const result = await db.query(`
      SELECT * FROM messages
      WHERE conversation_id = $1
      ORDER BY created_at ASC;
    `, [conversationId]);

    res.status(200).json(result.rows); // Return all messages in the conversation
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
};

// ✅ Send a message to a conversation
const sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { senderId, text } = req.body;

  // ✅ Validate input
  if (!senderId || !text || !conversationId) {
    return res.status(400).json({ message: "senderId, text, and conversationId are required." });
  }

  try {
    // ✅ Insert message into the messages table
    const result = await db.query(`
      INSERT INTO messages (conversation_id, sender_id, text)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [conversationId, senderId, text]);

    // ✅ Optionally: Update the last message in the conversation
    await db.query(`
      UPDATE conversations
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = $1;
    `, [conversationId]);

    res.status(201).json(result.rows[0]); // Return the newly created message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message." });
  }
};

module.exports = {
  createConversation,
  getConversationsByUser,
  getMessagesByConversation,
  sendMessage,
};
