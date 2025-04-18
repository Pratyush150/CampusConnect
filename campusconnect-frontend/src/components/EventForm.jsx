import React, { useState } from "react"; // Import React and useState hook

const EventForm = () => {
  // Initial state for event form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
    location: "",
    category: "Tech", // Default category
    image: null, // For now we won’t preview/upload it
  });

  // Handles input change for all text-based fields (title, description, location, category)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles image upload (currently a mock)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // Handles form submit and simulates a success message
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    alert("✅ Event created successfully (mock only)"); // Success alert
    console.log("Event Data:", formData); // Log event data (in real-world, send this to the backend)
  };

  return (
    <form
      onSubmit={handleSubmit} // Trigger handleSubmit on form submission
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4 w-full"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Post a New Event</h2>

      {/* Event Title Input */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      {/* Event Description Textarea */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
        rows={4}
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      {/* Date & Time Input */}
      <input
        type="datetime-local"
        name="datetime"
        value={formData.datetime}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      {/* Event Location Input */}
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Event Location"
        required
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      {/* Category Dropdown */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        <option value="Tech">Tech</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
        <option value="Workshop">Workshop</option>
      </select>

      {/* Image Upload Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0 file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Event
      </button>
    </form>
  );
};

export default EventForm; // Export the component

