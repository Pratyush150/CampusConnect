import React from "react";

// Features component start
const Features = () => {
  return (
    // Full width section with background and padding
    <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
      {/* Section heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Why CampusConnect?
      </h2>

      {/* Features grid container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Explore Nearby Colleges</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Discover colleges near your location with just one click.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Study Resources</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Access notes, PDFs, previous year papers shared by other students.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Events & Clubs</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Join cultural, tech & other clubs. Stay updated on events and fests.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Peer/Alumni Network</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Connect with students and alumni to get help, guidance, and support.
          </p>
        </div>
      </div>
    </section>
  );
};

// Exporting the Features component
export default Features;
