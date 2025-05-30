import React, { useState } from "react";

const MentorProfile = ({ user, updateMentorProfile }) => {
  // Guard clause: show skeleton loader if user is not yet loaded
  if (!user) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl animate-pulse space-y-4">
        {/* Skeleton loading */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>
        <div className="space-y-3 mt-6">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    expertise: Array.isArray(user?.expertise) ? user.expertise : [],
    availability: user?.availability || "",
  });
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleProfileEdit = () => {
    setIsEditing(!isEditing);
    setSuccessMsg("");
  };

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

  const handleSaveProfile = async () => {
    setSaving(true);
    setSuccessMsg("");
    const profileData = {
      ...formData,
      expertise: typeof formData.expertise === "string"
        ? formData.expertise.split(",").map((item) => item.trim())
        : formData.expertise,
      profilePic,
    };
    await updateMentorProfile(profileData);
    setIsEditing(false);
    setSaving(false);
    setSuccessMsg("Profile updated successfully!");
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
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h1>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-300">{user.bio}</p>
        </div>
      </div>

      {successMsg && (
        <div className="mt-2 text-green-600 text-sm">{successMsg}</div>
      )}

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
            value={Array.isArray(formData.expertise) ? formData.expertise.join(", ") : formData.expertise}
            onChange={(e) =>
              setFormData({
                ...formData,
                expertise: e.target.value,
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
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Expertise</h2>
        <ul className="flex gap-2 mt-2 flex-wrap">
          {user.expertise?.length > 0 ? (
            user.expertise.map((item, index) => (
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

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Availability</h2>
        <p className="text-gray-600 dark:text-gray-300">{user.availability}</p>
      </div>
    </div>
  );
};

export default MentorProfile;

