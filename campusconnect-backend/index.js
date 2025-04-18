// index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import http from "http";
import { Server } from "socket.io";

// Route files
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import campusWallRoutes from "./routes/campusWallRoutes.js"; // ✅ NEW CampusWall routes

dotenv.config(); // Load env variables

const app = express();
const prisma = new PrismaClient();
const server = http.createServer(app); // HTTP server for socket.io

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow any frontend origin (for dev)
    methods: ["GET", "POST"],
  },
});

// ✅ Handle real-time connections
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // Joining a chat room
  socket.on("join", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handle sending and receiving messages
  socket.on("sendMessage", ({ roomId, message }) => {
    socket.to(roomId).emit("receiveMessage", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON

// Test route
app.get("/", (req, res) => {
  res.send("CampusConnect Backend with Real-time Chat is Running 🚀");
});

// ✅ Mount route handlers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/campuswall", campusWallRoutes); // ✅ NEW CampusWall endpoint

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the backend server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
