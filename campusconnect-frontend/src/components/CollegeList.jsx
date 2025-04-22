import { useEffect, useState } from 'react';

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [geoError, setGeoError] = useState('');

  useEffect(() => {
    const getGeolocation = async () => {
      try {
        // Get user geolocation
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch colleges within 100km radius
            const response = await fetch(`/api/colleges?latitude=${latitude}&longitude=${longitude}&radius=100`);
            if (!response.ok) {
              throw new Error('Failed to fetch nearby colleges');
            }
            const data = await response.json();
            
            setColleges(data);
            setLoading(false);
          },
          (err) => {
            setGeoError('Unable to access your location. Please enable location services.');
            setLoading(false);
          }
        );
      } catch (err) {
        setError('Error fetching geolocation');
        setLoading(false);
      }
    };

    getGeolocation();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (geoError) return <div>{geoError}</div>;
  if (colleges.length === 0) return <div>No colleges found nearby</div>;

  return (
    <div>
      <h2>Nearby Colleges</h2>
      <ul>
        {colleges.map((college) => (
          <li key={college.id}>{college.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CollegeList;
