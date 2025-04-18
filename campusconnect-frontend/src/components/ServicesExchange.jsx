import React, { useState } from "react";

const ServicesExchange = () => {
  // Form input state
  const [formData, setFormData] = useState({
    role: "offer",
    serviceType: "",
    description: "",
    price: "",
    contact: "",
  });

  // All service posts
  const [services, setServices] = useState([]);

  // Filters & search
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Chat modal state
  const [selectedService, setSelectedService] = useState(null);
  const [messageText, setMessageText] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new service
  const handleSubmit = (e) => {
    e.preventDefault();
    setServices((prev) => [formData, ...prev]);
    setFormData({
      role: "offer",
      serviceType: "",
      description: "",
      price: "",
      contact: "",
    });
  };

  // Filter + Search services
  const filteredServices = services.filter((service) => {
    const matchesRole = filter === "all" || service.role === filter;
    const matchesSearch =
      service.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Open & close modal
  const openChatModal = (service) => {
    setSelectedService(service);
    setMessageText("");
  };

  const closeModal = () => {
    setSelectedService(null);
    setMessageText("");
  };

  const handleSendMessage = () => {
    // Here you can replace the alert with an API call to send the message.
    alert(`Message sent to ${selectedService.contact}:\n\n${messageText}`);
    closeModal();
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Offer / Request Academic Help
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

      {/* FILTER & SEARCH */}
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
          </div>

          {/* SERVICE LIST */}
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div
                key={index}
                className="border dark:border-gray-700 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 mb-3"
              >
                <p className="font-semibold text-gray-700 dark:text-white">
                  {service.role === "offer"
                    ? "🧑‍🏫 Offering"
                    : "🆘 Requesting"}:{" "}
                  {service.serviceType}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                {service.price && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    💰 Price: {service.price}
                  </p>
                )}
                {service.contact && (
                  <>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      📞 Contact: {service.contact}
                    </p>
                    <button
                      onClick={() => openChatModal(service)}
                      className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Message
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300 mt-3">
              No services found matching your search or filter.
            </p>
          )}
        </div>
      )}

      {/* Empty state if no services at all */}
      {services.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
          No services posted yet. Be the first to post!
        </p>
      )}

      {/* CHAT MODAL */}
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
