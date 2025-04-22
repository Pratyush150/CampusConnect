import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import pkg from 'pg';

dotenv.config();

import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import followRoutes from './routes/followRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import campusWallRoutes from './routes/campusWallRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';

const app = express();
const server = http.createServer(app);

// 👇 Allow socket.io from frontend port
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// 💬 Socket.IO logic
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('join', (roomId) => {
    socket.join(roomId);
    console.log(`📥 User joined room: ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    socket.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ✅ Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));
app.use(express.json());

// 🔗 Prisma and raw PG Pool
const prisma = new PrismaClient();
const pool = new pkg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🏫 Colleges Query
app.get('/api/colleges', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM colleges WHERE city = $1 OR city = $2',
      ['Delhi', 'Noida']
    );
    res.json(result.rows);
  } catch (err) {
    console.error('❌ College Query Error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 🤖 OpenAI Chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return res.status(500).json({ error: 'OpenAI API error', details: data });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Internal error', details: error.message });
  }
});

// 👋 Health check
app.get('/', (req, res) => {
  res.send('CampusConnect Backend with Real-time Chat is Running 🚀');
});

// ✅ Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/campuswall', campusWallRoutes);
app.use('/api', collegeRoutes);

// ❌ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Uncaught Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 🚀 Server Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

