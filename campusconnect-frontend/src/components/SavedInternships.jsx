// src/components/SavedInternships.jsx
import React from 'react';

// Define the SavedInternships component
const SavedInternships = ({ internships }) => {
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
          {internships.map((internship) => (
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
              {internship.applyLink ? (
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
                <p className="mt-4 text-sm text-gray-500">Application link unavailable</p>
              )}

              {/* Posted by and date */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Posted by {internship.postedBy} on {internship.postedOn}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedInternships;

