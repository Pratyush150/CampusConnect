import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Function to handle button click and navigate to the college dashboard
  const handleEnterClick = () => {
    if (!college || !college.name) return;

    // Convert the college name to a URL-friendly slug (lowercase and hyphens)
    const collegeSlug = college.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens

    setLoading(true); // Show loading state during navigation
    // Navigate to that specific college dashboard page
    setTimeout(() => { // Simulating async loading state
      navigate(`/college/${collegeSlug}`);
      setLoading(false); // Reset loading state after navigation
    }, 500); // Simulate a delay
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
        aria-label={`Enter ${college.name} Dashboard`}
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Loading..." : "Enter"}
      </button>
    </div>
  );
};

export default CollegeCard;
