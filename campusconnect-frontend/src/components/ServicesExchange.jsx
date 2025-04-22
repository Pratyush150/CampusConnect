import React, { useState } from "react";

const ServicesExchange = () => {
  const [formData, setFormData] = useState({
    role: "offer",
    serviceType: "",
    description: "",
    price: "",
    contact: "",
  });

  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [selectedService, setSelectedService] = useState(null);
  const [messageText, setMessageText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      ...formData,
      createdAt: new Date(),
    };
    setServices((prev) => [newService, ...prev]);
    setFormData({
      role: "offer",
      serviceType: "",
      description: "",
      price: "",
      contact: "",
    });
  };

  const filteredServices = services
    .filter((service) => {
      const matchesRole = filter === "all" || service.role === filter;
      const matchesSearch =
        service.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesSearch;
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const openChatModal = (service) => {
    setSelectedService(service);
    setMessageText("");
  };

  const closeModal = () => {
    setSelectedService(null);
    setMessageText("");
  };

  const handleSendMessage = () => {
    alert(`Message sent to ${selectedService.contact}:\n\n${messageText}`);
    closeModal();
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Offer / Request Academic Help
      </h2>

      {/* 🔹 Form Section */}
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            I want to:
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="offer">Offer Help</option>
            <option value="request">Request Help</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Service Type
          </label>
          <input
            type="text"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            placeholder="e.g., Assignment, Notes"
            required
            className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us what you offer or need..."
            required
            className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Expected Price (Optional)
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., ₹100"
            className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Contact (email or phone)
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="e.g., your@email.com"
            className="mt-1 w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="sm:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </form>

      {/* 🔹 Filter, Search, Sort */}
      {services.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All</option>
              <option value="offer">Only Offers</option>
              <option value="request">Only Requests</option>
            </select>

            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-full sm:w-64 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* 🔹 Table View */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border text-sm">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Service</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <td className="p-2 border text-center capitalize">
                      {service.role}
                    </td>
                    <td className="p-2 border">{service.serviceType}</td>
                    <td className="p-2 border">{service.description}</td>
                    <td className="p-2 border text-center">
                      {service.price || "-"}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => openChatModal(service)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🔹 Empty State */}
      {services.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
          No services posted yet. Be the first to post!
        </p>
      )}

      {/* 🔹 Chat Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Message to {selectedService.contact}
            </h3>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
              placeholder="Type your message here..."
              className="w-full p-2 rounded-md border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesExchange;


