import React, { useState, useEffect } from 'react';

const CollegeSearch = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);

  // TEMPORARY: Real college data (Delhi NCR)
  const dummyColleges = [
    { id: 1, name: 'Delhi University', city: 'Delhi', type: 'Public' },
    { id: 2, name: 'Jamia Millia Islamia', city: 'Delhi', type: 'Public' },
    { id: 3, name: 'IIT Delhi', city: 'Delhi', type: 'Public' },
    { id: 4, name: 'Amity University', city: 'Noida', type: 'Private' },
    { id: 5, name: 'NSUT Delhi', city: 'Delhi', type: 'Public' },
    { id: 6, name: 'Shiv Nadar University', city: 'Greater Noida', type: 'Private' },
    { id: 7, name: 'IP University', city: 'Delhi', type: 'Public' },
    { id: 8, name: 'Lady Shri Ram College', city: 'Delhi', type: 'Public' },
  ];

  useEffect(() => {
    // Replace this with API call once backend is connected
    setColleges(dummyColleges);
    setFilteredColleges(dummyColleges);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    filterColleges(val, locationFilter);
  };

  const handleFilter = (e) => {
    const val = e.target.value;
    setLocationFilter(val);
    filterColleges(searchTerm, val);
  };

  const filterColleges = (search, location) => {
    let result = colleges;

    if (search) {
      result = result.filter(college =>
        college.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      result = result.filter(college =>
        college.city.toLowerCase() === location.toLowerCase()
      );
    }

    setFilteredColleges(result);
  };

  return (
    <div className="college-search p-4">
      <h2 className="text-xl font-semibold mb-3">Search Colleges</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-full sm:w-1/2"
        />

        <select
          value={locationFilter}
          onChange={handleFilter}
          className="p-2 border rounded w-full sm:w-1/2"
        >
          <option value="">All Cities</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Greater Noida">Greater Noida</option>
        </select>
      </div>

      <div className="grid gap-3">
        {filteredColleges.length === 0 ? (
          <p>No colleges match your criteria.</p>
        ) : (
          filteredColleges.map(college => (
            <div key={college.id} className="p-3 border rounded shadow-sm">
              <h3 className="font-bold">{college.name}</h3>
              <p>{college.city} — {college.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollegeSearch;
