import React from "react";

// Dummy college data
const colleges = [
  { id: 1, name: "Maharaja Agrasen Institute of Technology", location: "Delhi" },
  { id: 2, name: "Mumbai Tech University", location: "Mumbai" },
  { id: 3, name: "Chennai Engineering College", location: "Chennai" },
];

const CollegeSelector = () => {
  return (
    <section className="py-12 px-6 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Select Your College
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="p-6 rounded-xl shadow-md border dark:border-gray-700 dark:bg-gray-800"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {college.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {college.location}
            </p>
            <button
              onClick={() => handleSelectCollege(college)} // Add functionality to handle selection
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Enter
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

// Optional: A function to handle what happens when a college is selected
const handleSelectCollege = (college) => {
  // For now, it just logs the college name (can later be connected to routing or state management)
  console.log("Selected College:", college.name);
};

export default CollegeSelector;

