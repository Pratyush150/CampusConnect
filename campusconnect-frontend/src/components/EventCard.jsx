import React from "react"; // Import React to use JSX

// EventCard component receives event details as props
const EventCard = ({ title, date, description, category }) => {
  return (
    // Card container with light/dark mode styles
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      {/* Event Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Event Date */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        📅 {date}
      </p>

      {/* Event Category Tag */}
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
        {category}
      </p>

      {/* Event Description */}
      <p className="text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default EventCard; // Export component for use elsewhere
