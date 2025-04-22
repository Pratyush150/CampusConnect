import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css"; // Import resizable styles

const ChatBot = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Toggle the chatbot visibility
  const toggleChat = () => setIsChatVisible(!isChatVisible);

  return (
    <>
      {/* Button to open/close Chatbot */}
      <div
        onClick={toggleChat}
        className="fixed bottom-16 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer z-50"
      >
        <span role="img" aria-label="chat">
          💬
        </span>
      </div>

      {/* Chatbot Window */}
      {isChatVisible && (
        <Draggable>
          <div className="fixed bottom-24 right-6 z-50">
            <ResizableBox
              width={350}
              height={400}
              minConstraints={[250, 250]}
              maxConstraints={[500, 600]}
              axis="both"
            >
              <div className="bg-gray-900 dark:bg-gray-800 text-white p-4 rounded-xl shadow-xl flex flex-col w-full border-2 border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-semibold text-gray-300">
                    Chatbot
                  </h4>
                  <button
                    onClick={toggleChat}
                    className="text-red-500 text-lg font-semibold"
                  >
                    X
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-2 mb-4">
                  {/* Chat content */}
                  <div className="mb-2">
                    <p className="text-gray-300">Hi, how can I assist you?</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-300">Ask me anything!</p>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
                    Send
                  </button>
                </div>
              </div>
            </ResizableBox>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default ChatBot;


