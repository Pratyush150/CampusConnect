import React from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Save icons

// ✅ Card component to display one internship listing
const InternshipCard = ({ internship, onSave, isSaved }) => {
  return (
    <div className="border rounded-lg shadow p-4 relative bg-white dark:bg-gray-800">
      {/* Top badges */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs bg-yellow-300 text-black px-2 py-1 rounded">
          Top Contributor ⭐
        </span>
        {internship.verified && (
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
            Verified ✅
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-bold mb-1">{internship.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        {internship.description}
      </p>

      {/* Domain + Type + Location */}
      <p className="text-xs text-gray-500 mb-1">
        {internship.domain} • {internship.type} • {internship.location}
      </p>

      {/* Eligibility & Criteria (new fields) */}
      {internship.eligibility && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          <strong>Eligibility:</strong> {internship.eligibility}
        </p>
      )}
      {internship.criteria && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          <strong>Criteria:</strong> {internship.criteria}
        </p>
      )}

      {/* Save & Apply Buttons */}
      <div className="flex justify-between items-center mt-2">
        <button onClick={() => onSave(internship)}>
          {isSaved ? (
            <FaBookmark className="text-blue-500" />
          ) : (
            <FaRegBookmark className="text-gray-400" />
          )}
        </button>
        <a
          href={internship.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default InternshipCard;
