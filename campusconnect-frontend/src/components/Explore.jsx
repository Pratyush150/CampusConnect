import React from "react";
import CollegeList from "../components/CollegeList";        // Nearby
import CollegeSearch from "../components/CollegeSearch";    // Manual

const Explore = () => {
  return (
    <div className="p-4 space-y-8">
      {/* Section 1: Based on Geolocation */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Nearby Colleges (within 100km)</h2>
        <CollegeList />
      </div>

      {/* Section 2: Manual Search/Filter */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Search Colleges Manually</h2>
        <CollegeSearch />
      </div>
    </div>
  );
};

export default Explore;
