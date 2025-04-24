import React, { useState } from "react";

// This component will display the user's profile information
const Profile = ({ user, updateUserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    interests: user.interests,
    services: user.services,
  });
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const handleProfileEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Logic to upload the image (API call for uploading)
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = () => {
    updateUserProfile(formData); // API call to update profile
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
      <div className="flex items-center gap-4">
        {/* Profile picture */}
        <div className="relative">
          <img
            src={profilePic || "default-profile-pic.jpg"} // Use default if no profile pic provided
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
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="text-2xl font-semibold text-gray-800 dark:text-white"
            />
          ) : (
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h1>
          )}
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

      {/* Edit Profile Fields */}
      {isEditing && (
        <div className="mt-4">
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            placeholder="Bio"
          />
          <input
            type="text"
            name="interests"
            value={formData.interests.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                interests: e.target.value.split(","),
              })
            }
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            placeholder="Interests (comma separated)"
          />
          <input
            type="text"
            name="services"
            value={formData.services.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                services: e.target.value.split(","),
              })
            }
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            placeholder="Services (comma separated)"
          />
          <button
            onClick={handleSaveProfile}
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save Profile
          </button>
        </div>
      )}

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


