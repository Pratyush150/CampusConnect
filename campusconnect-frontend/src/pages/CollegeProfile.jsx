import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// Correct path for Button
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"; // Correct path for tabs.jsx

const CollegeProfile = () => {
  const { collegeId } = useParams(); // Get college ID from URL
  const navigate = useNavigate();

  // Dummy data – replace with real fetch later
  const collegeData = {
    id: collegeId,
    name: "Lovely Professional University",
    location: "Jalandhar, Punjab",
    description:
      "A premier institution with a wide variety of student activities and a strong academic environment.",
    bannerImage:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc", // placeholder
  };

  // Function when Join College button is clicked
  const handleJoinCollege = () => {
    alert("Joined successfully!"); // Later: integrate with backend
    navigate(`/dashboard/${collegeId}`); // Redirect to college dashboard
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Banner image */}
      <img
        src={collegeData.bannerImage}
        alt="College Banner"
        className="w-full h-64 object-cover rounded-2xl shadow-md"
      />

      {/* College Name + Location */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {collegeData.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {collegeData.location}
        </p>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed">
        {collegeData.description}
      </p>

      {/* Join College Button */}
      <div className="mt-6">
        <Button onClick={handleJoinCollege} className="text-white bg-blue-600 hover:bg-blue-700">
          Join College
        </Button>
      </div>

      {/* Module Preview */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">What's Inside?</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-200">
          <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">🎓 Student Feed</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">📚 Study Vault</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">🎉 Clubs & Events</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">🤝 MentorMap</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">🛠️ Services Exchange</li>
        </ul>
      </div>
    </div>
  );
};

export default CollegeProfile;

