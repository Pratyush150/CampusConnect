// src/components/Leaderboard.jsx
import React, { useState } from 'react';

// Leaderboard component for displaying all contributors with sorting and pagination
const Leaderboard = ({ contributors }) => {
  const [sortOrder, setSortOrder] = useState('desc'); // Sorting order: 'asc' or 'desc'
  const [page, setPage] = useState(1); // Page number for pagination
  const itemsPerPage = 5; // Number of contributors per page

  // Function to handle sorting based on contribution points
  const sortedContributors = [...contributors].sort((a, b) => {
    return sortOrder === 'asc' ? a.contributionPoints - b.contributionPoints : b.contributionPoints - a.contributionPoints;
  });

  // Pagination logic: slice contributors array based on page
  const paginatedContributors = sortedContributors.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Handle sorting toggle
  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Leaderboard</h2>

      {/* Sort Button */}
      <button
        onClick={handleSortToggle}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Sort by Contributions ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {/* Leaderboard List */}
      <div className="space-y-4">
        {paginatedContributors.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No contributors yet.</p>
        ) : (
          paginatedContributors.map((contributor, idx) => (
            <div key={idx} className="flex items-center space-x-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="flex-shrink-0">
                {/* Contributor Avatar */}
                <img src={contributor.avatar} alt={`${contributor.name} avatar`} className="w-10 h-10 rounded-full" />
              </div>
              <div className="flex-grow">
                {/* Contributor Name and Contribution Points */}
                <h3 className="font-medium text-gray-800 dark:text-gray-100">{contributor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{contributor.contributionPoints} Points</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-400"
        >
          Prev
        </button>
        <span className="text-gray-600 dark:text-gray-300">
          Page {page} of {Math.ceil(contributors.length / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(page < Math.ceil(contributors.length / itemsPerPage) ? page + 1 : page)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
