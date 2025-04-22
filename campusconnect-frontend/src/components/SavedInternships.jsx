import React, { useState, useEffect } from 'react';

// Define the SavedInternships component
const SavedInternships = ({ internships }) => {
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [visibleInternships, setVisibleInternships] = useState([]); // Internships to display
  const [loading, setLoading] = useState(false); // Loading state for infinite scroll

  const internshipsPerPage = 5; // Number of internships to show per page

  // Simulate API call for pagination (for demo purposes)
  const loadMoreInternships = () => {
    if (loading) return; // Prevent multiple requests at once
    setLoading(true);
    setTimeout(() => {
      setVisibleInternships(internships.slice(0, page * internshipsPerPage));
      setLoading(false);
    }, 1000); // Simulate loading time
  };

  // Effect to load more internships on page change
  useEffect(() => {
    loadMoreInternships();
  }, [page]);

  // Handle internship removal
  const removeInternship = (id) => {
    const updatedInternships = internships.filter((internship) => internship.id !== id);
    // Normally, you'd update the state or call an API to delete the internship
    // Here we just simulate the change for demo purposes
    alert(`Internship with ID: ${id} has been removed!`);
  };

  return (
    <div>
      {/* Heading for saved internships */}
      <h2 className="text-lg font-semibold mb-2">Saved Internships</h2>

      {/* Conditional rendering based on saved internships */}
      {internships.length === 0 ? (
        // Display message when no internships are saved
        <p className="text-gray-500">You haven't saved any internships yet.</p>
      ) : (
        // Display a list of saved internships if there are any
        <div className="space-y-4">
          {visibleInternships.map((internship) => (
            <div key={internship.id} className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
              {/* Internship Title */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{internship.title}</h3>
              
              {/* Company and Location */}
              <p className="text-sm text-gray-600 dark:text-gray-300">{internship.company} • {internship.location}</p>

              {/* Internship Type and Duration */}
              <p className="text-sm text-gray-600 dark:text-gray-300">{internship.type} • {internship.duration}</p>

              {/* Stipend Information */}
              <p className="text-sm text-gray-600 dark:text-gray-300">Stipend: {internship.stipend}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {internship.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Apply Now Button */}
              {internship.applyLink && /^https?:\/\//.test(internship.applyLink) ? (
                <a
                  href={internship.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  aria-label={`Apply for ${internship.title}`}
                >
                  Apply Now
                </a>
              ) : (
                <p className="mt-4 text-sm text-gray-500">Application link unavailable or invalid</p>
              )}

              {/* Posted by and date */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Posted by {internship.postedBy} on {internship.postedOn}
              </p>

              {/* Remove Internship Button */}
              <button
                onClick={() => removeInternship(internship.id)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove Internship
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {internships.length > internshipsPerPage && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-2 text-gray-600">Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * internshipsPerPage >= internships.length}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Loading indicator for infinite scroll */}
      {loading && <p className="text-center mt-4 text-gray-500">Loading...</p>}
    </div>
  );
};

export default SavedInternships;


