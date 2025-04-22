import React, { useState } from "react";

// This component will display the user's profile information
const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (e) => {
    // Logic to update profile pic goes here (e.g., upload the new image)
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
      <div className="flex items-center gap-4">
        {/* Profile picture */}
        <div className="relative">
          <img
            src={user.profilePic || "default-profile-pic.jpg"} // Use default if no profile pic provided
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          {/* Profile picture change button */}
          <button
            onClick={() => document.getElementById('profile-pic-input').click()}
            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1"
          >
            <i className="fa fa-camera"></i>
          </button>
          <input
            type="file"
            id="profile-pic-input"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{user.bio}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={handleProfileEdit}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {isEditing ? "Cancel Edit" : "Edit Profile"}
      </button>

      {/* Interests */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Interests</h2>
        <ul className="flex gap-2 mt-2">
          {user.interests.length > 0 ? (
            user.interests.map((interest, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded transition hover:bg-blue-200"
              >
                {interest}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">No interests listed.</p>
          )}
        </ul>
      </div>

      {/* Services offered by the user */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Services</h2>
        <ul className="flex gap-2 mt-2">
          {user.services.length > 0 ? (
            user.services.map((service, index) => (
              <li
                key={index}
                className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded transition hover:bg-green-200"
              >
                {service}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">No services offered.</p>
          )}
        </ul>
      </div>

      {/* Followers */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Followers</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{user.followers.length} Followers</p>
        {/* Option to view followers */}
        <button className="text-blue-500 hover:text-blue-700 mt-2">View Followers</button>
      </div>
    </div>
  );
};

export default Profile;


