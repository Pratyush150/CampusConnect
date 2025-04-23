// src/socket.js
import { io } from 'socket.io-client';

const backendURL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

if (!import.meta.env.VITE_SOCKET_URL) {
  console.warn('⚠️ VITE_SOCKET_URL not defined in .env — using fallback:', backendURL);
}

const socket = io(backendURL, {
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: true,
});

// ✅ Successful connection
socket.on('connect', () => {
  console.log(`✅ Connected to socket server (id: ${socket.id})`);
});

// ❌ Disconnection
socket.on('disconnect', (reason) => {
  console.warn(`❌ Disconnected from socket server — Reason: ${reason}`);
});

// ⚠️ Connection error
socket.on('connect_error', (err) => {
  console.error('⚠️ Socket connection error:', err.message);
});

export default socket;

