import React from "react";

// Component to display individual post
const PostCard = ({ name = "Anonymous", time = "Just now", content = "No content", profile = "/default-profile.jpg" }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 mb-4">
      {/* Header: Profile image + Name + Time */}
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={profile}
          alt={`${name}'s Profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        </div>
      </div>

      {/* Post content */}
      <p className="text-gray-800 dark:text-gray-100 text-sm">{content}</p>
    </div>
  );
};

export default PostCard;
