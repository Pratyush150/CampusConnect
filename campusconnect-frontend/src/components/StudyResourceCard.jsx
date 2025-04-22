// src/components/StudyResourceCard.jsx
import React from "react";

// Card component to display individual study resources
const StudyResourceCard = ({ subject, description, file, resourceType }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
      {/* Subject name */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{subject}</h2>

      {/* Description of the resource */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>

      {/* Resource type (e.g., Notes, Paper, Slides) */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Type: <span className="font-medium">{resourceType}</span>
      </p>

      {/* Dummy download button */}
      <button
        className="text-blue-600 hover:underline"
        onClick={() => alert("Download will work after backend")}
      >
        Download Resource
      </button>
    </div>
  );
};

export default StudyResourceCard;
