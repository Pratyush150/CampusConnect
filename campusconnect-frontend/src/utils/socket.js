// src/socket.js
import { io } from 'socket.io-client';

const backendURL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';  // Fallback URL

// Warn if VITE_SOCKET_URL is not defined in .env
if (!import.meta.env.VITE_SOCKET_URL) {
  console.warn('⚠️ VITE_SOCKET_URL not defined in .env — using fallback:', backendURL);
}

// Establish connection to Socket.IO server
const socket = io(backendURL, {
  transports: ['websocket'],  // Ensure WebSocket transport is used
  withCredentials: true,       // Ensures cookies/session are sent if needed
  autoConnect: true,           // Automatically attempts to connect
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

// Optional: Handle reconnect attempts
socket.on('reconnect', (attempt) => {
  console.log(`🔄 Reconnected to socket server (attempt ${attempt})`);
});

// Optional: Handle reconnect error
socket.on('reconnect_error', (err) => {
  console.error('⚠️ Socket reconnection error:', err.message);
});

export default socket;


