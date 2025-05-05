// src/socket.js
import { io } from 'socket.io-client';

// Use environment variable for socket server URL or fallback to local URL
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
  reconnectionAttempts: 5,     // Limit reconnection attempts
  reconnectionDelay: 1000,     // Delay between reconnection attempts (1 second)
  reconnectionDelayMax: 5000,  // Maximum delay between reconnection attempts (5 seconds)
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

// Optional: Emit authentication event after connection (if using authentication via sockets)
socket.on('connect', () => {
  const token = localStorage.getItem('authToken');  // Or get token from cookies, depending on your setup
  if (token) {
    socket.emit('authenticate', { token });
  }
});

// Listen for authentication success or failure from the server
socket.on('authenticated', (status) => {
  if (status === 'success') {
    console.log('✅ Authentication successful');
  } else {
    console.log('❌ Authentication failed');
    socket.disconnect();  // Disconnect if authentication fails
  }
});

export default socket;


