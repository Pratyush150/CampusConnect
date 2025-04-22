import React, { useState, useEffect } from "react";
import EventCard from "./EventCard"; // Component to display each event card

// List of categories for dropdown & filters
const categories = ["Tech", "Cultural", "Sports", "Workshop"];

const ClubsEvents = () => {
  // ---------- State ----------
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All"); // Category filter
  const [timeFilter, setTimeFilter] = useState("All"); // Upcoming | Past | All
  const [sortOrder, setSortOrder] = useState("Newest"); // Newest | Oldest

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  const [loading, setLoading] = useState(false); // To show loading indicator

  // ---------- Fetch Events (API Call) ----------
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await api.get('/events'); // Assuming '/events' fetches the events
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // ---------- Handlers ----------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic form validation
    if (!formData.title || !formData.description || !formData.date || !formData.category) {
      alert("Please fill all fields.");
      setLoading(false);
      return;
    }

    const newEvent = {
      ...formData,
      id: Date.now(), // Unique ID
    };

    setEvents((prev) => [newEvent, ...prev]);
    setFormData({ title: "", description: "", date: "", category: "" });
    setLoading(false);
  };

  // ---------- Date Filters ----------
  const isUpcoming = (date) => new Date(date) >= new Date();
  const isPast = (date) => new Date(date) < new Date();

  // ---------- Processed Events (Filtered + Sorted) ----------
  const processedEvents = events
    .filter((event) => filter === "All" || event.category === filter)
    .filter((event) =>
      timeFilter === "All"
        ? true
        : timeFilter === "Upcoming"
        ? isUpcoming(event.date)
        : isPast(event.date)
    )
    .sort((a, b) =>
      sortOrder === "Newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className="space-y-6">
      {/* ---------- Category Filter ---------- */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded ${filter === cat ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---------- Time Filter ---------- */}
      <div className="flex flex-wrap gap-2">
        {["All", "Upcoming", "Past"].map((time) => (
          <button
            key={time}
            onClick={() => setTimeFilter(time)}
            className={`px-3 py-1 rounded text-sm ${timeFilter === time ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* ---------- Sort Dropdown ---------- */}
      <div className="flex gap-2 items-center mt-2">
        <label className="text-sm text-gray-700 dark:text-gray-300">Sort:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-2 py-1 rounded border dark:bg-gray-900 dark:border-gray-600"
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {/* ---------- Reset Filters Button ---------- */}
      <button
        onClick={() => {
          setFilter("All");
          setTimeFilter("All");
          setSortOrder("Newest");
        }}
        className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
      >
        Reset Filters
      </button>

      {/* ---------- Post Event Form ---------- */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Post a New Event</h3>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
        ></textarea>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Posting..." : "Post Event"}
        </button>
      </form>

      {/* ---------- Display Events ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {processedEvents.length > 0 ? (
          processedEvents.map((event) => (
            <EventCard key={event.id} title={event.title} description={event.description} date={event.date} category={event.category} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 col-span-2 text-center">
            No events found for "{filter}" category and "{timeFilter}" filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClubsEvents;

