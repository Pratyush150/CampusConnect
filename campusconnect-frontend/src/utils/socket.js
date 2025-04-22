// socket.js
import { io } from 'socket.io-client';

const backendURL = import.meta.env.VITE_SOCKET_URL;

if (!backendURL) {
  console.warn('⚠️ VITE_SOCKET_URL is not defined in .env');
}

const socket = io(backendURL, {
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: true,
});

// ✅ Connection
socket.on('connect', () => {
  console.log('✅ Connected to socket server:', socket.id || 'no socket id');
});

// ❌ Disconnection
socket.on('disconnect', () => {
  console.log('❌ Disconnected from socket server');
});

// ⚠️ Error
socket.on('connect_error', (err) => {
  console.error('⚠️ Socket connection error:', err.message);
});

export default socket;
