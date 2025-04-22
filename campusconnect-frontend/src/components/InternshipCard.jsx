import React from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Save icons
import { formatDistanceToNow } from 'date-fns'; // ⏱️ For "X days ago" format

const InternshipCard = ({ internship, onSave, isSaved }) => {
  const {
    title,
    description,
    domain,
    type,
    location,
    eligibility,
    criteria,
    applyLink,
    verified,
    datePosted,
  } = internship;

  // Format "posted x days ago" using date-fns
  const postedAgo = datePosted
    ? formatDistanceToNow(new Date(datePosted), { addSuffix: true })
    : null;

  // Check if remote
  const isRemote = location?.toLowerCase().includes("remote");

  return (
    <div className="border rounded-lg shadow p-4 relative bg-white dark:bg-gray-800">
      {/* Top badges */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs bg-yellow-300 text-black px-2 py-1 rounded">
          Top Contributor ⭐
        </span>
        {verified && (
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
            Verified ✅
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-1">{title}</h3>

      {/* Description fallback */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        {description || "No description provided."}
      </p>

      {/* Domain & Type badges */}
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {domain || "General"}
        </span>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {type || "Internship"}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            isRemote
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {location || "Unknown Location"}
        </span>
        {postedAgo && (
          <span className="text-xs text-gray-500 ml-auto">
            Posted {postedAgo}
          </span>
        )}
      </div>

      {/* Eligibility & Criteria */}
      {eligibility && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          <strong>Eligibility:</strong> {eligibility}
        </p>
      )}
      {criteria && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          <strong>Criteria:</strong> {criteria}
        </p>
      )}

      {/* Save & Apply Buttons */}
      <div className="flex justify-between items-center mt-2">
        {/* Tooltip on hover */}
        <button
          onClick={() => onSave(internship)}
          title={isSaved ? "Remove from Saved" : "Save this opportunity"}
        >
          {isSaved ? (
            <FaBookmark className="text-blue-500" />
          ) : (
            <FaRegBookmark className="text-gray-400" />
          )}
        </button>

        {/* Apply Button with fallback */}
        {applyLink ? (
          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Apply Now
          </a>
        ) : (
          <span className="text-sm text-gray-400 italic">No link available</span>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;
