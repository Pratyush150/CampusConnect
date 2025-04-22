// src/components/StudyResourceVault.jsx
import React, { useState, useEffect } from "react";
import StudyResourceForm from "./StudyResourceForm";  // Form for uploading new resources
import StudyResourceCard from "./StudyResourceCard";  // Card to display individual resources

const StudyResourceVault = () => {
  // State for managing resources, filters, and search term
  const [resources, setResources] = useState([]); // List of uploaded resources
  const [filter, setFilter] = useState("All"); // Filter for resource types (Notes, Papers, etc.)
  const [searchTerm, setSearchTerm] = useState(""); // Search term for searching resources

  // Fetch resources from the API on initial load
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/resources'); // Assuming '/resources' fetches the resources
        setResources(res.data);  // Store fetched resources in the state
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources(); // Call the function to fetch resources
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Add a new resource to the list
  const handleAddResource = (resource) => {
    setResources((prev) => [resource, ...prev]);  // Add the new resource to the beginning of the list
  };

  // Filter and search logic
  const filteredResources = resources.filter((res) => {
    // Filter based on resource type (Notes, Papers, etc.)
    const matchType = filter === "All" || res.resourceType === filter;
    
    // Search the resource by subject or description
    const matchSearch =
      res.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Return the resource if both filter and search match
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Form to upload new resources */}
      <StudyResourceForm onAddResource={handleAddResource} />

      {/* Filter and Search bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <select
          value={filter}  // Current filter state
          onChange={(e) => setFilter(e.target.value)}  // Update filter state on change
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="All">All Types</option>
          <option value="Notes">Notes</option>
          <option value="Previous Year Paper">Previous Year Papers</option>
          <option value="Slides">Slides</option>
          <option value="Books">Books</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="text"
          placeholder="Search by subject or description..."
          value={searchTerm}  // Current search term
          onChange={(e) => setSearchTerm(e.target.value)}  // Update search term on change
          className="p-2 border rounded w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Display filtered resources */}
      {filteredResources.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No resources found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res, index) => (
            <StudyResourceCard key={index} {...res} />  // Display each filtered resource as a card
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyResourceVault;


