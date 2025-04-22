import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy college data
const colleges = [
  { id: 1, name: "Maharaja Agrasen Institute of Technology", location: "Delhi" },
  { id: 2, name: "Mumbai Tech University", location: "Mumbai" },
  { id: 3, name: "Chennai Engineering College", location: "Chennai" },
];

const CollegeSelector = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCollege = (college) => {
    const collegeSlug = college.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/college/${collegeSlug}`);
  };

  return (
    <section className="py-12 px-6 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Select Your College
      </h2>

      {/* Search input */}
      <input
        type="text"
        className="p-2 mb-4 w-full rounded-lg"
        placeholder="Search for colleges"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        {filteredColleges.map((college) => (
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
              onClick={() => handleSelectCollege(college)}
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

export default CollegeSelector;

