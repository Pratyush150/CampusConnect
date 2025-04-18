// src/components/StudyResourceUpload.jsx
import React, { useState } from "react";

const StudyResourceUpload = ({ handleAddResource }) => {
  const [formData, setFormData] = useState({
    resourceType: "",
    subject: "",
    description: "",
    file: null,
  });

  // Handle form data change (for text fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  // Submit form and call parent handler to add resource
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check to ensure all fields are filled
    if (formData.file && formData.subject && formData.description && formData.resourceType) {
      handleAddResource(formData);  // Pass the form data to parent component
      // Reset the form data after submitting
      setFormData({
        resourceType: "",
        subject: "",
        description: "",
        file: null,
      });
    } else {
      alert("Please fill all fields and upload a file.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Resource Type input */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Resource Type
        </label>
        <input
          type="text"
          name="resourceType"
          value={formData.resourceType}
          onChange={handleChange}
          placeholder="e.g., Notes, PDF"
          className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Subject input */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g., Data Structures, DBMS"
          className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Description input */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Describe the resource"
          className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* File upload input */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload File
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

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
