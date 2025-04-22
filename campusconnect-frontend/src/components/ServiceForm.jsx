import React, { useState } from "react";

const ServiceForm = () => {
  const [mode, setMode] = useState("offer");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for handling form errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!serviceType || !description || !price) {
      setError("Please fill all the fields.");
      return;
    }
    if (price <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Log form data (later send to backend)
    console.log({ mode, serviceType, description, price });

    // Reset form fields
    setMode("offer");
    setServiceType("");
    setDescription("");
    setPrice("");

    // Simulate async API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Service submitted successfully!");
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-xl mx-auto mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Offer or Request a Service
      </h2>

      {/* Display Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Offer / Request Toggle */}
        <div className="flex justify-center gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="offer"
              checked={mode === "offer"}
              onChange={() => setMode("offer")}
              className="accent-blue-600"
            />
            <span className="text-gray-700 dark:text-white font-medium">Offer</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="request"
              checked={mode === "request"}
              onChange={() => setMode("request")}
              className="accent-blue-600"
            />
            <span className="text-gray-700 dark:text-white font-medium">Request</span>
          </label>
        </div>

        {/* Type of Service */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
            Type of Service
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          >
            <option value="" disabled>Select a service</option>
            <option value="assignment">Assignment</option>
            <option value="file">File</option>
            <option value="project">Project</option>
            <option value="research">Research Paper</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
            Description
          </label>
          <textarea
            placeholder="Describe your requirement or offer..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
            Expected Price (₹)
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Service"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;


