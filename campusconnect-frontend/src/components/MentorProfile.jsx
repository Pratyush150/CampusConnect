import React, { useState } from "react";


// MentorProfile component displays mentor's profile information
const MentorProfile = ({ mentor, updateMentorProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mentor?.name || "",
    bio: mentor?.bio || "",
    expertise: mentor?.expertise || [],
    availability: mentor?.availability || "",
  });
  const [profilePic, setProfilePic] = useState(mentor?.profilePic || "");

  const handleProfileEdit = () => setIsEditing(!isEditing);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    updateMentorProfile({ ...formData, profilePic });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={profilePic || "default-profile-pic.jpg"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            onClick={() => document.getElementById("profile-pic-input").click()}
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
              className="text-2xl font-semibold text-gray-800 dark:text-white bg-transparent border-b border-gray-400 focus:outline-none"
            />
          ) : (
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{mentor.name}</h1>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-300">{mentor.bio}</p>
        </div>
      </div>

      <button
        onClick={handleProfileEdit}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {isEditing ? "Cancel Edit" : "Edit Profile"}
      </button>

      {isEditing && (
        <div className="mt-4 space-y-4">
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg text-gray-800"
            placeholder="Bio"
          />
          <input
            type="text"
            name="expertise"
            value={formData.expertise.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                expertise: e.target.value.split(",").map((item) => item.trim()),
              })
            }
            className="w-full p-3 border rounded-lg text-gray-800"
            placeholder="Expertise (comma separated)"
          />
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg text-gray-800"
            placeholder="Availability"
          />
          <button
            onClick={handleSaveProfile}
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save Profile
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Expertise</h2>
        <ul className="flex gap-2 mt-2 flex-wrap">
          {mentor.expertise?.length > 0 ? (
            mentor.expertise.map((item, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded transition hover:bg-blue-200"
              >
                {item}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">No expertise listed.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MentorProfile;
