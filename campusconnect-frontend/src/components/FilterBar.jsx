import React from "react";
import { FaSearch, FaUndo } from "react-icons/fa";

// Sample domain categories — you can customize these
const domainOptions = [
  "Web Development",
  "Data Science",
  "Graphic Design",
  "Marketing",
  "App Development",
  "Writing",
  "Video Editing",
];

const FilterBar = ({ filters, onChange, onReset }) => {
  return (
    <div className="flex flex-wrap gap-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow mb-4 items-end">
      
      {/* 🔍 Search Bar */}
      <div title="Search by title or description">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Search title or description"
            className="p-2 border rounded pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* 🎯 Domain Dropdown */}
      <div title="Select a domain or category">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Domain
        </label>
        <select
          name="domain"
          value={filters.domain}
          onChange={onChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {domainOptions.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      {/* 🧩 Type Filter */}
      <div title="Filter by type of work">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Type
        </label>
        <select
          name="type"
          value={filters.type}
          onChange={onChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      {/* 🕒 Sort Filter */}
      <div title="Sort by date posted">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Sort By
        </label>
        <select
          name="sort"
          value={filters.sort}
          onChange={onChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* 🔄 Reset Button */}
      <button
        onClick={onReset}
        className="ml-auto flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        title="Reset all filters"
      >
        <FaUndo />
        Reset
      </button>
    </div>
  );
};

export default FilterBar;

