import React from 'react';

// Dummy profile data
const userProfile = {
  name: "Aman Sharma",
  bio: "Computer Science student passionate about coding and open-source contributions.",
  profilePic: "https://randomuser.me/api/portraits/men/75.jpg", // Dummy image
  services: ["Assignment Help", "Research Papers", "Coding Assistance"],
  followers: 120,
  following: 95,
  posts: [
    { id: 1, content: "Started a new project on React! Excited to share my progress!" },
    { id: 2, content: "Looking for someone to collaborate on a machine learning project!" },
  ]
};

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-8 flex items-center">
        <img
          src={userProfile.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-6 object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{userProfile.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{userProfile.bio}</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Services Offered</h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
          {userProfile.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Followers and Following */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-8 flex justify-between">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{userProfile.followers}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{userProfile.following}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {userProfile.posts.map((post) => (
            <div key={post.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
