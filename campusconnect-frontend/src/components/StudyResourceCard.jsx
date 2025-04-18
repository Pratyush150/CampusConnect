// src/components/StudyResourceCard.jsx
import React from "react";

const StudyResourceCard = ({ subject, description, file, resourceType }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{subject}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Type: <span className="font-medium">{resourceType}</span>
      </p>
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
