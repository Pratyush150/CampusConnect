import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

// Dummy data for users
const dummyUsers = [
  { id: 1, name: "Ananya Sharma", college: "XYZ University" },
  { id: 2, name: "Rohit Mehra", college: "ABC Institute" },
  { id: 3, name: "Priya Verma", college: "Tech College" },
  { id: 4, name: "Aryan Khanna", college: "Delhi Tech" },
];

const FollowSystem = () => {
  // 🔄 Load from localStorage
  const [following, setFollowing] = useState(() => {
    const stored = localStorage.getItem("following");
    return stored ? JSON.parse(stored) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  // 💾 Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("following", JSON.stringify(following));
  }, [following]);

  // 🔁 Toggle follow/unfollow
  const handleToggleFollow = (userId) => {
    setFollowing((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // 🔍 Filter users by name or college
  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Connect with Peers
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Following: {following.length}
          </p>
        </div>

        {/* 🔍 Search input */}
        <input
          type="text"
          placeholder="Search by name or college..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredUsers.map((user) => {
          const isFollowing = following.includes(user.id);
          const isSuggested = user.college === "XYZ University"; // 🎯 Example condition

          return (
            <div
              key={user.id}
              className={`group border p-4 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 relative shadow-md hover:shadow-lg transition duration-300 ${
                isSuggested ? "border-blue-500" : ""
              }`}
            >
              {/* 🧠 Suggested badge */}
              {isSuggested && (
                <span className="absolute top-2 left-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  Suggested
                </span>
              )}

              {/* 👤 Avatar + Name */}
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="text-2xl text-gray-600 dark:text-white" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.college}
                  </p>
                </div>
              </div>

              {/* 🔁 Follow/Unfollow */}
              <button
                onClick={() => handleToggleFollow(user.id)}
                className={`mt-2 px-4 py-1 rounded font-medium w-full text-sm ${
                  isFollowing
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowSystem;


