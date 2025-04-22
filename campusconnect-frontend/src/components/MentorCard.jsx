import React from "react";

/**
 * Displays individual mentor's information.
 * Props: name, title, company, category, verified, linkedin, avatar, isAvailable
 */
const MentorCard = ({
  name,
  title,
  company,
  category,
  verified,
  linkedin,
  avatar,
  isAvailable,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-shadow duration-200">
      {/* Mentor Avatar */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={avatar || "/default-avatar.png"} // Default avatar if none provided
          alt={`${name}'s avatar`}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {title} at {company}
          </p>
        </div>
      </div>

      {/* Mentor's Category (as a badge) */}
      {category && (
        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
          {category}
        </span>
      )}

      {/* Display Verified Status */}
      {verified && (
        <span className="block mt-2 text-green-500 text-sm font-medium">
          ✔ Verified
        </span>
      )}

      {/* Availability Status */}
      {isAvailable && (
        <span className="block mt-2 text-yellow-500 text-sm font-medium">
          🟢 Available for Mentorship
        </span>
      )}

      {/* LinkedIn Profile Link */}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-500 hover:underline"
        >
          View LinkedIn
        </a>
      )}
    </div>
  );
};

export default MentorCard;



