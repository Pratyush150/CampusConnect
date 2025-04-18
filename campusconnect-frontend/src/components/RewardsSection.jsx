// src/components/RewardsSection.jsx
import React from 'react';

// RewardsSection component for displaying top contributors
const RewardsSection = ({ topContributors }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Top 3 Contributors
      </h2>
      <div className="space-y-4">
        {topContributors.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No top contributors yet.</p>
        ) : (
          topContributors.slice(0, 3).map((contributor, idx) => (
            <div key={idx} className="flex items-center space-x-4 p-2 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="flex-shrink-0">
                {/* Contributor Avatar */}
                <img src={contributor.avatar} alt={`${contributor.name} avatar`} className="w-10 h-10 rounded-full" />
              </div>
              <div className="flex-grow">
                {/* Contributor Name and Contribution Points */}
                <h3 className="font-medium text-gray-800 dark:text-gray-100">{contributor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contributor.contributionPoints} Points
                </p>
              </div>
              {/* Displaying a badge based on their rank */}
              <div>
                {idx === 0 && (
                  <span className="bg-yellow-500 text-white text-xs py-1 px-2 rounded-full">Gold</span>
                )}
                {idx === 1 && (
                  <span className="bg-gray-400 text-white text-xs py-1 px-2 rounded-full">Silver</span>
                )}
                {idx === 2 && (
                  <span className="bg-orange-500 text-white text-xs py-1 px-2 rounded-full">Bronze</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RewardsSection;

