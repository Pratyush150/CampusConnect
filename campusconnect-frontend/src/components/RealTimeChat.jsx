import React, { useState, useEffect, useRef } from 'react';
import socket from '../utils/socket';
import axios from 'axios';

const RealTimeChat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const roomId = useRef([userId, receiverId].sort().join('-'));

  // 🔃 Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/chat/messages?conversationId=${roomId.current}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchMessages();
  }, [userId, receiverId]);

  // 🟢 Join room & set socket listeners
  useEffect(() => {
    const currentRoom = roomId.current;
    socket.emit('joinRoom', currentRoom);

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('typing', (senderId) => {
      if (senderId !== userId) {
        setTypingUser(senderId);
        setTimeout(() => setTypingUser(null), 2000);
      }
    });

    socket.on('messageSeen', ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, seen: true } : msg))
      );
    });

    return () => {
      socket.emit('leaveRoom', currentRoom);
      socket.off('receiveMessage');
      socket.off('typing');
      socket.off('messageSeen');
    };
  }, [userId, receiverId]);

  // ✍️ Emit typing
  const handleTyping = () => {
    socket.emit('typing', { roomId: roomId.current, senderId: userId });
  };

  // 📤 Send text message
  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const msg = {
      senderId: userId,
      receiverId,
      content: trimmed,
      timestamp: new Date().toISOString(),
      conversationId: roomId.current,
    };

    setIsSending(true);
    socket.emit('sendMessage', { roomId: roomId.current, message: msg });
    setMessages((prev) => [...prev, msg]);
    setMessage('');
    setIsSending(false);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/chat/messages`, msg);
    } catch (err) {
      console.error('Message save error:', err);
    }
  };

  // 🔄 Scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 📎 File upload handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('senderId', userId);
    formData.append('receiverId', receiverId);
    formData.append('roomId', roomId.current);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat/upload`, formData);
      socket.emit('sendMessage', { roomId: roomId.current, message: res.data });
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

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
              <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                isSent
                  ? 'bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white'
                  : 'bg-green-100 dark:bg-green-600 text-green-900 dark:text-white'
              }`}>
                {msg.content ? (
                  <div>{msg.content}</div>
                ) : (
                  <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    📎 View File
                  </a>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {isSent && msg.seen && ' • Seen'}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {typingUser && (
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          User {typingUser} is typing...
        </div>
      )}

      <div className="input-area flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
            else handleTyping();
          }}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg font-semibold"
        >
          📎
        </button>
        <button
          onClick={sendMessage}
          disabled={!message.trim() || isSending}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold ${
            isSending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default RealTimeChat;








