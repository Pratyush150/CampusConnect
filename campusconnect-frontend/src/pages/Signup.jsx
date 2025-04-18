import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState(""); // To capture the email input
  const [collegeID, setCollegeID] = useState(null); // 🟡 College ID file
  const [preview, setPreview] = useState(""); // 🟢 For image preview

  const handleIDUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCollegeID(file); // Store the file
      setPreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 You can now send `collegeID` file to backend via FormData
    console.log("Email:", email);
    console.log("College ID File:", collegeID);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Sign Up</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* College ID Upload */}
        <label className="text-gray-700 dark:text-gray-200 text-sm">
          Upload College ID (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleIDUpload}
          className="w-full text-sm"
        />

        {/* ID Preview */}
        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">College ID Preview:</p>
            <img
              src={preview}
              alt="College ID Preview"
              className="h-24 rounded border mt-2"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;

