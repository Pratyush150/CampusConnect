import React, { useState } from "react";

// Dummy data for users
const dummyUsers = [
  { id: 1, name: "Ananya Sharma", college: "XYZ University" },
  { id: 2, name: "Rohit Mehra", college: "ABC Institute" },
  { id: 3, name: "Priya Verma", college: "Tech College" },
  { id: 4, name: "Aryan Khanna", college: "Delhi Tech" },
];

const FollowSystem = () => {
  // State to track the IDs of users being followed
  const [following, setFollowing] = useState([]);

  // Function to toggle follow/unfollow status of a user
  const handleToggleFollow = (userId) => {
    if (following.includes(userId)) {
      // Unfollow the user by filtering out the user ID
      setFollowing(following.filter((id) => id !== userId));
    } else {
      // Follow the user by adding their ID to the following array
      setFollowing([...following, userId]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Connect with Peers
      </h2>

      {/* Displaying the list of users */}
      <div className="grid gap-4 sm:grid-cols-2">
        {dummyUsers.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
          >
            {/* User Name */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user.name}
            </h3>
            {/* User's College */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.college}
            </p>

            {/* Follow/Unfollow Button */}
            <button
              onClick={() => handleToggleFollow(user.id)}
              className={`mt-3 px-4 py-1 rounded font-medium ${
                following.includes(user.id)
                  ? "bg-red-500 hover:bg-red-600 text-white" // If already following, show 'Unfollow'
                  : "bg-blue-600 hover:bg-blue-700 text-white" // If not following, show 'Follow'
              }`}
            >
              {following.includes(user.id) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowSystem;

