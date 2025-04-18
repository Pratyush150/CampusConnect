import React from 'react';

// This component will display the user's profile information
const Profile = ({ user }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
      <div className="flex items-center gap-4">
        {/* Profile picture */}
        <img
          src={user.profilePic || 'default-profile-pic.jpg'} // Use default if no profile pic provided
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{user.bio}</p>
        </div>
      </div>

      {/* Interests */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Interests</h2>
        <ul className="flex gap-2 mt-2">
          {user.interests.length > 0 ? (
            user.interests.map((interest, index) => (
              <li key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded">
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
              <li key={index} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded">
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
      </div>
    </div>
  );
};

export default Profile;

