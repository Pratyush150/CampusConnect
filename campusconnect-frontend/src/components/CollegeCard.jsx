import React from "react";
import { useNavigate } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const navigate = useNavigate(); // Use navigate hook for routing

  // Function to handle button click and navigate to the college dashboard
  const handleEnterClick = () => {
    // Convert the college name to a URL-friendly slug (lowercase and hyphens)
    const collegeSlug = college.name.toLowerCase().replace(/\s+/g, "-");

    // Navigate to that specific college dashboard page
    navigate(`/college/${collegeSlug}`);
  };

  // Optional: Adding a fallback in case college object is missing or has no name
  if (!college || !college.name) {
    return <p className="text-red-500">Invalid college data</p>;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* College Name - Displaying the name */}
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {college.name}
      </h2>

      {/* Button to Enter the College Dashboard */}
      <button
        onClick={handleEnterClick}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Enter
      </button>
    </div>
  );
};

export default CollegeCard;

