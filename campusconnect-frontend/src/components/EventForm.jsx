import React, { useState } from "react";

const EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    datetime: "",
    location: "",
    category: "Tech",
    image: null,
  });

  const categories = ["Tech", "Cultural", "Sports", "Workshop"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Event created successfully (mock)");
    console.log("Event Data:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      title: "",
      description: "",
      datetime: "",
      location: "",
      category: "Tech",
      image: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-5 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        Post a New Event
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
        rows={4}
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
      />

      <input
        type="datetime-local"
        name="datetime"
        value={formData.datetime}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
      />

      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Event Location"
        required
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {formData.image && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Selected: {formData.image.name}
        </p>
      )}

      {formData.image && (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="Event Preview"
          className="w-32 h-32 object-cover mt-2"
        />
      )}

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
