import React, { useState, useEffect, useRef } from 'react';
import socket from '../utils/socket';

const RealTimeChat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const roomId = `room-${userId}-${receiverId}`;
    socket.emit('join', roomId);

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId, receiverId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msg = {
      senderId: userId,
      receiverId,
      text: message.trim(),
      timestamp: new Date().toISOString(),
    };

    setIsSending(true);
    const roomId = `room-${userId}-${receiverId}`;
    socket.emit('sendMessage', { roomId, message: msg });
    setMessages((prev) => [...prev, msg]);
    setMessage('');
    setIsSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
        Chat with User {receiverId}
      </h2>

      <div className="chat-window mb-4 max-h-60 overflow-y-auto bg-white dark:bg-gray-700 p-3 rounded-lg">
        {messages.map((msg, index) => {
          const isSent = msg.senderId === userId;
          return (
            <div key={index} className={`mb-2 ${isSent ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-3 py-2 rounded-lg text-sm ${isSent ? 'bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white' : 'bg-green-100 dark:bg-green-600 text-green-900 dark:text-white'}`}>
                <div>{msg.text}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <div className="input-area flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim() || isSending}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default RealTimeChat;






