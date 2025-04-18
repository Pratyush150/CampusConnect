import React from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

// Updated FilterBar component with domain, type, search, and sort functionality
const FilterBar = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap gap-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow mb-4 items-end">
      {/* Search Bar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            name="search" // Binding the search filter
            value={filters.search} // Using the filters state for search value
            onChange={onChange} // Triggering the onChange function passed as prop
            placeholder="Search title or description"
            className="p-2 border rounded pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500" // Added focus styles for better UX
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" /> {/* Search icon position */}
        </div>
      </div>

      {/* Domain Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Domain
        </label>
        <input
          type="text"
          name="domain" // Binding the domain filter
          value={filters.domain} // Using the domain filter state
          onChange={onChange} // Handling domain change
          placeholder="e.g., Web Dev"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Type
        </label>
        <select
          name="type" // Binding the type filter
          value={filters.type} // Using the type filter state
          onChange={onChange} // Handling type selection change
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option> {/* Default option for all types */}
          <option value="Internship">Internship</option> {/* Internship type option */}
          <option value="Freelance">Freelance</option> {/* Freelance type option */}
        </select>
      </div>

      {/* Sort Order Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Sort By
        </label>
        <select
          name="sort" // Binding the sort filter
          value={filters.sort} // Using the sort filter state
          onChange={onChange} // Handling sort order change
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option> {/* Sorting by newest */}
          <option value="oldest">Oldest First</option> {/* Sorting by oldest */}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
