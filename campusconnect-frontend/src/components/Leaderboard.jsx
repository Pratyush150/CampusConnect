import React, { useState, useEffect } from 'react';

// Leaderboard component for displaying all contributors with sorting, infinite scrolling, and error handling
const Leaderboard = ({ contributors = [] }) => {
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [sortBy, setSortBy] = useState('contributionPoints');
  const [page, setPage] = useState(1); // current page
  const [itemsPerPage] = useState(5); // items per page

  const [sortedContributors, setSortedContributors] = useState([]);
  const [displayedContributors, setDisplayedContributors] = useState([]);

  // Sort contributors when contributors, sortBy, or sortOrder changes
  useEffect(() => {
    let sorted = [...contributors];
    if (sortBy === 'contributionPoints') {
      sorted = sorted.sort((a, b) =>
        sortOrder === 'asc'
          ? (a.contributionPoints ?? 0) - (b.contributionPoints ?? 0)
          : (b.contributionPoints ?? 0) - (a.contributionPoints ?? 0)
      );
    } else if (sortBy === 'name') {
      sorted = sorted.sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
      if (sortOrder === 'desc') sorted.reverse();
    }
    setSortedContributors(sorted);
    setDisplayedContributors(sorted.slice(0, itemsPerPage));
    setPage(1);
  }, [contributors, sortBy, sortOrder, itemsPerPage]);

  // Load more contributors for infinite scrolling
  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextContributors = sortedContributors.slice(
      nextPage * itemsPerPage,
      (nextPage + 1) * itemsPerPage
    );
    setDisplayedContributors((prev) => [...prev, ...nextContributors]);
    setPage(nextPage);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Leaderboard</h2>
      {/* Sorting dropdown */}
      <div className="mb-4">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <option value="contributionPoints">Sort by Contributions</option>
          <option value="name">Sort by Name</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Sort ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>
      {/* Contributors List */}
      <div className="space-y-4">
        {displayedContributors.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No contributors available.</p>
        ) : (
          displayedContributors.map((contributor, idx) => (
            <div
              key={contributor.id || idx}
              className="flex items-center space-x-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow"
            >
              <div className="flex-shrink-0">
                <img
                  src={contributor.avatar || '/default-avatar.png'}
                  alt={`${contributor.name || 'Anonymous'} avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800 dark:text-gray-100">
                  {contributor.name || 'Anonymous'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contributor.contributionPoints ?? 0} Points
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More Button for Infinite Scrolling */}
      {displayedContributors.length < sortedContributors.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

