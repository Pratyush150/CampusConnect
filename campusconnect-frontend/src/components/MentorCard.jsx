// src/components/MentorMap/MentorCard.jsx
import React from "react";

/**
 * Displays individual mentor's information.
 * Props: name, title, company, category, verified, linkedin
 */
const MentorCard = ({ name, title, company, category, verified, linkedin }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      {/* Mentor's Name */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>

      {/* Mentor's Title and Company */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {title} at {company}
      </p>

      {/* Mentor's Category */}
      <p className="text-sm mt-1 text-blue-600">{category}</p>

      {/* Display Verified Status */}
      {verified && (
        <span className="text-green-500 text-sm font-medium">✔ Verified</span>
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

