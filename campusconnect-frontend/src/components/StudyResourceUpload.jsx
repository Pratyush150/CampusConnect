// src/components/StudyResourceUpload.jsx
import React, { useState } from "react";

const StudyResourceUpload = ({ handleAddResource }) => {
  // Initialize form data state
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    file: null,
    resourceType: "Notes", // Default value
  });

  // Handle input changes (including file upload)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Set file if present, else set text
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation to ensure all fields are filled
    if (
      formData.subject.trim() === "" ||
      formData.description.trim() === "" ||
      !formData.file ||
      !formData.resourceType
    ) {
      alert("Please fill all fields and upload a file.");
      return;
    }

    // Pass the data to parent handler
    handleAddResource(formData);

    // Reset form
    setFormData({
      subject: "",
      description: "",
      file: null,
      resourceType: "Notes",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-6 space-y-4"
    >
      {/* Subject input */}
      <input
        type="text"
        name="subject"
        placeholder="Subject Name"
        value={formData.subject}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
      />

      {/* Description input */}
      <textarea
        name="description"
        placeholder="Brief Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
      />

      {/* File input */}
      <input
        type="file"
        name="file"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
      />

      {/* Resource type dropdown */}
      <select
        name="resourceType"
        value={formData.resourceType}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
      >
        <option>Notes</option>
        <option>Previous Year Paper</option>
        <option>Slides</option>
        <option>Books</option>
        <option>Others</option>
      </select>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload Resource
      </button>
    </form>
  );
};

export default StudyResourceUpload;

