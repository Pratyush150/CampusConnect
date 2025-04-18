// src/components/InternshipHub.jsx

import React, { useState } from 'react';
import InternshipForm from './InternshipForm';
import InternshipCard from './InternshipCard';
import SavedInternships from './SavedInternships';
import FilterBar from './FilterBar';
import RewardsSection from './RewardsSection';

const InternshipHub = () => {
  const [internships, setInternships] = useState([]);
  const [filter, setFilter] = useState({
    domain: 'all',
    type: 'all',
    search: '',
    sort: 'newest',
  });
  const [saved, setSaved] = useState([]);
  const [viewSaved, setViewSaved] = useState(false);

  // Dummy data for top contributors
  const topContributors = [
    { name: "Alice", internshipsPosted: 10, rating: 4.5 },
    { name: "Bob", internshipsPosted: 8, rating: 4.2 },
    { name: "Charlie", internshipsPosted: 7, rating: 4.8 },
  ];

  // Add new internship
  const handleAdd = (internship) => {
    const withMeta = {
      ...internship,
      createdAt: Date.now(),
      verified: Math.random() < 0.3, // Random verification for demo
    };
    setInternships((prev) => [withMeta, ...prev]);
  };

  // Save/Unsave internship
  const handleSave = (internship) => {
    const exists = saved.some((s) => s.title === internship.title);
    if (exists) {
      setSaved((prev) => prev.filter((i) => i.title !== internship.title));
    } else {
      setSaved((prev) => [...prev, internship]);
    }
  };

  // Handle filter/search/sort changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply all filters
  const filtered = internships
    .filter((item) => {
      const domainMatch = filter.domain === 'all' || item.domain.toLowerCase().includes(filter.domain.toLowerCase());
      const typeMatch = filter.type === 'all' || item.type === filter.type;
      const searchMatch =
        item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filter.search.toLowerCase());
      return domainMatch && typeMatch && searchMatch;
    })
    .sort((a, b) =>
      filter.sort === 'newest'
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt
    );

  return (
    <div className="space-y-4">
      {/* Internship Posting Form */}
      <InternshipForm onAdd={handleAdd} />

      {/* Toggle View Saved */}
      <button
        onClick={() => setViewSaved((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {viewSaved ? 'View All' : 'View Saved'}
      </button>

      {/* Filter + Internship List */}
      {!viewSaved ? (
        <>
          <FilterBar filters={filter} onChange={handleFilterChange} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((i, idx) => (
              <InternshipCard
                key={idx}
                internship={i}
                onSave={handleSave}
                isSaved={saved.some((s) => s.title === i.title)}
              />
            ))}
          </div>
        </>
      ) : (
        <SavedInternships internships={saved} />
      )}

      {/* Rewards Section (Top Contributors) */}
      <RewardsSection topContributors={topContributors} />
    </div>
  );
};

export default InternshipHub;
