import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import fetch from "node-fetch";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Import Prisma client singleton
import { prisma } from "./prisma/prismaClient.js";

// Route Imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import campusWallRoutes from "./routes/campusWallRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";

// Environment Variables
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// File Upload Setup (with security)
const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    // Sanitize filename
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, `${Date.now()}-${sanitized}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_, file, cb) => {
    cb(null, allowedTypes.includes(file.mimetype));
  },
});

// Express Setup
const app = express();
const server = http.createServer(app);

app.set("trust proxy", 1);

// --- SECURITY MIDDLEWARE ---
app.use(helmet());
app.use(cookieParser());

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://zingy-licorice-136dfc.netlify.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.options("*", cors());

// --- BODY PARSER ---
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

// --- SOCKET.IO SETUP ---
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.set("io", io);

// --- SOCKET.IO EVENTS ---
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("join", (roomId) => {
    if (roomId) socket.join(roomId);
  });

  socket.on("sendMessage", async ({ roomId, message }) => {
    if (!roomId || !message?.senderId || !message?.conversationId) return;
    try {
      const saved = await prisma.message.create({
        data: {
          senderId: message.senderId,
          conversationId: message.conversationId,
          content: message.content || null,
          fileUrl: message.fileUrl || null,
          type: message.type || "TEXT",
        },
        include: { sender: true },
      });
      await prisma.conversation.update({
        where: { id: message.conversationId },
        data: { updatedAt: new Date() },
      });
      io.to(roomId).emit("receiveMessage", saved);
    } catch (err) {
      console.error("❌ Message save error:", err);
    }
  });

  socket.on("markSeen", async ({ conversationId, userId }) => {
    if (!conversationId || !userId) return;
    try {
      await prisma.message.updateMany({
        where: {
          conversationId,
          NOT: { senderId: userId },
        },
        data: { isSeen: true },
      });
      io.to(conversationId).emit("messagesSeen", { conversationId, seenBy: userId });
    } catch (err) {
      console.error("❌ Seen error:", err);
    }
  });

  socket.on("typing", ({ conversationId, userId }) => {
    if (conversationId && userId) socket.to(conversationId).emit("userTyping", { userId });
  });

  socket.on("stopTyping", ({ conversationId, userId }) => {
    if (conversationId && userId) socket.to(conversationId).emit("userStopTyping", { userId });
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// --- OPENAI RATE LIMITING ---
const openAiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests to AI in a short time. Please wait.",
});

app.post("/api/chat", openAiLimiter, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: "OpenAI Error", details: data });

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Chatbot error:", error);
    res.status(500).json({ error: "Internal error", details: error.message });
  }
});

// --- FILE UPLOAD ROUTE ---
app.post("/api/chat/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

// --- FETCH CHAT HISTORY ROUTE ---
app.get("/api/chat/history/:roomId", async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: req.params.roomId },
      orderBy: { createdAt: "asc" },
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// --- SAVE CHAT MESSAGE ROUTE ---
app.post("/api/chat/save", async (req, res) => {
  try {
    const { senderId, receiverId, text, roomId } = req.body;
    const conversation = await prisma.conversation.upsert({
      where: { id: roomId },
      update: { updatedAt: new Date() },
      create: {
        id: roomId,
        participants: {
          connect: [{ id: senderId }, { id: receiverId }],
        },
      },
    });
    const message = await prisma.message.create({
      data: {
        content: text,
        senderId,
        conversationId: conversation.id,
      },
    });
    res.json({ success: true, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Message save failed" });
  }
});

// --- HEALTH CHECK ROUTE ---
app.get("/", (_, res) => res.send("CampusConnect Backend with Real-time Chat is Running 🚀"));

// --- API ROUTES SETUP ---
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/campuswall", campusWallRoutes);
app.use("/api", collegeRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error("❌ Uncaught Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
