// src/components/MentorMap/MentorMap.jsx
import React, { useState } from "react";
import MentorCard from "./MentorCard";
import mentors from "./MentorData";

/**
 * Main MentorMap UI component with category and subcategory filtering.
 * Displays a list of mentors based on selected categories.
 */
const MentorMap = () => {
  // Main categories that can be selected
  const mainCategories = ["Tech", "Non-Tech", "Higher Studies"];

  // Subcategories corresponding to each main category
  const subcategories = {
    Tech: [
      "Programming & Development",
      "Data Science & AI",
      "Product Management",
      "UI/UX & Design",
      "Tech Internships & Hackathons",
      "Open Source Contributions",
      "Freelancing in Tech",
    ],
    "Non-Tech": [
      "Core Engineering Careers",
      "Core Research & Internships",
      "PSU/IES Exam Prep",
      "GATE & Higher Education in Core",
      "Case Studies & Guesstimates",
      "Resume & Interview Prep",
      "Business & Strategy Roles",
      "Analytics & Management Internships",
      "Clubs, Competitions & B-School Prep",
      "Design & Arts Careers",
      "Entrepreneurship & Startups",
      "Government/UPSC Exams",
      "NGO & Social Sector Work",
    ],
    "Higher Studies": [
      "MS in US/Europe",
      "MBA Abroad (GMAT, MIM, etc.)",
      "SOPs, LORs & Resume",
      "GRE/GMAT/IELTS/TOEFL Prep",
      "College Shortlisting & Profile Building",
      "Study in India (IITs, IIMs, ISB, etc.)",
    ],
  };

  // State to manage selected main category and subcategory
  const [selectedMain, setSelectedMain] = useState("Tech");
  const [selectedSub, setSelectedSub] = useState("");

  // Filter mentors based on selected subcategory and category
  const filteredMentors = mentors.filter((mentor) =>
    selectedSub ? mentor.category === selectedSub : true
  );

  return (
    <div className="space-y-6">
      {/* Main Category Buttons */}
      <div className="flex flex-wrap gap-2">
        {mainCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedMain(cat);
              setSelectedSub(""); // Reset subcategory when changing main category
            }}
            className={`px-4 py-2 rounded ${
              selectedMain === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subcategory Dropdown */}
      <div>
        <select
          value={selectedSub}
          onChange={(e) => setSelectedSub(e.target.value)}
          className="px-3 py-2 border rounded dark:bg-gray-900 dark:text-white"
        >
          <option value="">-- Select Subcategory --</option>
          {subcategories[selectedMain].map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor, index) => (
            <MentorCard key={index} {...mentor} />
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500 dark:text-gray-300">
            No mentors found for the selected category.
          </p>
        )}
      </div>
    </div>
  );
};

export default MentorMap;


