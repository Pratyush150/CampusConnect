import React from "react";
import { formatDistanceToNow } from "date-fns"; // For time formatting

const PostCard = ({
  name = "Anonymous", 
  time = "Just now", 
  content = "No content", 
  profile = "/default-profile.jpg"
}) => {
  const timeFormatted = formatDistanceToNow(new Date(time)) + " ago"; // Example of dynamic time formatting

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 transition-all duration-300 hover:shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-700">
      {/* Header: Profile image + Name + Time */}
      <div className="flex items-center space-x-4 mb-3">
        <img
          src={profile}
          alt={`${name}'s Profile`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{timeFormatted}</p>
        </div>
      </div>

      {/* Post content */}
      <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </p>

      {/* Post Actions */}
      <div className="flex space-x-4 mt-4">
        <button className="text-blue-500 hover:underline">Like</button>
        <button className="text-blue-500 hover:underline">Comment</button>
        <button className="text-blue-500 hover:underline">Share</button>
      </div>
    </div>
  );
};

export default PostCard;


