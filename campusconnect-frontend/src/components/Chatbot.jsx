// Chatbot.jsx
import React, { useState } from 'react';

// Simple AI Chatbot component
const Chatbot = () => {
  const [query, setQuery] = useState(""); // User input query
  const [chatHistory, setChatHistory] = useState([]); // All previous chats

  // Updates input query as user types
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handles "Ask" button click
  const handleAsk = () => {
    if (query.trim() === "") return; // Ignore empty queries

    // Add user query and dummy bot response to chat history
    setChatHistory([...chatHistory, { user: query, bot: "Let's solve it together!" }]);
    setQuery(""); // Clear input field
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4">
      {/* Chatbot Heading */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        AI Chatbot
      </h2>

      {/* Display conversation history */}
      <div className="space-y-2 max-h-64 overflow-y-auto border p-3 rounded bg-gray-50 dark:bg-gray-700">
        {chatHistory.map((chat, index) => (
          <div key={index} className="space-y-1">
            <div className="text-right text-blue-600 dark:text-blue-300 font-medium">
              You: {chat.user}
            </div>
            <div className="text-left text-green-700 dark:text-green-300 font-medium">
              Bot: {chat.bot}
            </div>
          </div>
        ))}
      </div>

      {/* Input field and Ask button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Ask me something..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
        />
        <button
          onClick={handleAsk}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
