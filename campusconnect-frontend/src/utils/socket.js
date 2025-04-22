// src/utils/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('✅ Connected to socket server:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from socket server');
});

socket.on('connect_error', (err) => {
  console.error('⚠️ Socket connection error:', err.message);
});

export default socket;
