// socket.js
import { io } from 'socket.io-client';

// 🌐 Use environment variable for switching dev/prod URLs
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ['websocket'],     // Force WebSocket for reliability
  withCredentials: true,         // Needed if backend uses cookies/auth
});

// ✅ Connected
socket.on('connect', () => {
  console.log('✅ Connected to socket server:', socket.id);
});

// ❌ Disconnected
socket.on('disconnect', () => {
  console.log('❌ Disconnected from socket server');
});

// ⚠️ Connection Errors
socket.on('connect_error', (err) => {
  console.error('⚠️ Socket connection error:', err.message);
});

export default socket;
