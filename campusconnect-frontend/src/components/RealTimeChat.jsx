// src/components/RealTimeChat.jsx

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const RealTimeChat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]); // Store the chat messages
  const [message, setMessage] = useState(''); // Store the current input message
  const socket = io('http://localhost:5000'); // Connect to the backend server via socket

  useEffect(() => {
    // When the component mounts, join the chat room for user and receiver
    socket.emit('join', { userId, receiverId });

    // Listen for incoming messages
    socket.on('receive_message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]); // Update the chat history
    });

    // Cleanup function when the component is unmounted
    return () => {
      socket.emit('leave', { userId, receiverId }); // Leave the chat room
      socket.off('receive_message'); // Stop listening for new messages
    };
  }, [userId, receiverId]);

  // Handle sending a new message
  const sendMessage = () => {
    if (message.trim() !== '') {
      const msg = {
        senderId: userId,
        receiverId,
        text: message,
        timestamp: new Date().toISOString(),
      };

      // Emit the message to the backend server
      socket.emit('send_message', msg);

      // Add the message to the chat window locally
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="chat-container p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
        Chat with User {receiverId}
      </h2>

      {/* Display all chat messages */}
      <div className="chat-window mb-4 max-h-60 overflow-y-auto bg-white dark:bg-gray-700 p-3 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}
          >
            <div
              className={`text-sm font-medium ${
                msg.senderId === userId ? 'text-blue-600' : 'text-green-600'
              }`}
            >
              {msg.senderId === userId ? 'You' : `User ${msg.senderId}`}:
            </div>
            <div className="message-text text-gray-800 dark:text-white">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Input area for new messages */}
      <div className="input-area flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RealTimeChat;
