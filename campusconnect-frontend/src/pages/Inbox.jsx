import React from 'react';

// Dummy data for messages or service interactions
const messages = [
  { from: 'John Doe', message: 'Interested in your assignment help!', time: '2 days ago' },
  { from: 'Jane Smith', message: 'Looking for a mentor in tech!', time: '1 week ago' },
];

const Inbox = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Inbox</h2>
      <div className="mt-4">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">No new messages or service requests.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <h3 className="font-semibold text-gray-800 dark:text-white">{msg.from}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{msg.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;
