import React, { useState } from "react";

// ✅ Define the component
const InternshipForm = ({ onAddInternship }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    domain: '',
    type: 'Internship',
    location: '',
    applyLink: '',
    criteria: '',
    eligibility: '',
  });

  // ✅ Handle form changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.company || !formData.applyLink) {
      alert("Please fill required fields!");
      return;
    }

    onAddInternship({
      ...formData,
      id: Date.now(),
      saved: false,
      postedAt: new Date(),
    });

    // ✅ Reset form
    setFormData({
      title: '',
      company: '',
      description: '',
      domain: '',
      type: 'Internship',
      location: '',
      applyLink: '',
      criteria: '',
      eligibility: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 shadow rounded mb-6">
      <h2 className="text-lg font-semibold mb-4">Post New Opportunity</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          placeholder="Domain (e.g., AI, Web Dev)"
          className="p-2 border rounded"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
        </select>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="applyLink"
          value={formData.applyLink}
          onChange={handleChange}
          placeholder="Apply Link"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="criteria"
          value={formData.criteria}
          onChange={handleChange}
          placeholder="Criteria (e.g., CGPA > 7, Portfolio)"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          placeholder="Eligibility (e.g., 2nd or 3rd year)"
          className="p-2 border rounded"
        />
      </div>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mt-4 border rounded"
        rows="4"
      ></textarea>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
};

// ✅ Export the component
export default InternshipForm;
