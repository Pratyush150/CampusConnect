import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const EventCard = ({ id, title, date, description, category, image }) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Link to={`/events/${id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition duration-300 space-y-3">
        {image && (
          <img
            src={image ? URL.createObjectURL(image) : "/path/to/default-image.jpg"}
            alt="Event"
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
        )}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">📅 {formattedDate}</p>
        <span className="inline-block bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>
      </div>
    </Link>
  );
};

export default EventCard;
