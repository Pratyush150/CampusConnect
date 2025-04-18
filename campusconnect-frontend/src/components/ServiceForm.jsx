// src/components/ServiceForm.jsx
import React, { useState } from "react";

const ServiceForm = () => {
  const [mode, setMode] = useState("offer"); // 🟡 offer or request
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false); // 🟡 for handling async loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🟢 Log the form data (later send to backend)
    console.log({
      mode,
      serviceType,
      description,
      price,
    });

    // 🔁 Reset form
    setMode("offer");
    setServiceType("");
    setDescription("");
    setPrice("");

    // 🟠 Simulate async action (like API call)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Service submitted successfully!");
    }, 2000); // Simulate loading delay
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-xl mx-auto mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Offer or Request a Service
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Offer / Request Toggle */}
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="offer"
              checked={mode === "offer"}
              onChange={() => setMode("offer")}
              className="mr-2"
            />
            Offer
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="request"
              checked={mode === "request"}
              onChange={() => setMode("request")}
              className="mr-2"
            />
            Request
          </label>
        </div>

        {/* Type of Service */}
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="" disabled>Select service type</option>
          <option value="assignment">Assignment</option>
          <option value="file">File</option>
          <option value="project">Project</option>
          <option value="research">Research Paper</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Describe your requirement or offer..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          rows={3}
        ></textarea>

        {/* Price */}
        <input
          type="number"
          placeholder="Expected price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="1" // Ensure positive price
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full border border-blue-600 text-blue-600 p-2 rounded hover:bg-blue-600 hover:text-white transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit Service"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
