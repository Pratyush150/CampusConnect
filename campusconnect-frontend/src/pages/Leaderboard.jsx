import React from 'react';

// Dummy data for the leaderboard
const leaderboard = [
  { name: 'John Doe', points: 100, rank: 1 },
  { name: 'Jane Smith', points: 80, rank: 2 },
];

const Leaderboard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Leaderboard</h2>
      <div className="mt-4">
        {leaderboard.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">No data yet. Be the first to contribute!</p>
        ) : (
          leaderboard.map((user, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <h3
                className={`font-semibold text-gray-800 dark:text-white ${
                  user.rank === 1
                    ? 'text-yellow-500'
                    : user.rank === 2
                    ? 'text-gray-400'
                    : user.rank === 3
                    ? 'text-orange-500'
                    : ''
                }`}
              >
                {user.rank}. {user.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Points: {user.points}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

