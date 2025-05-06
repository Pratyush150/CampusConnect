import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from '../components/Leaderboard'; // Adjust path as needed

const API_ENDPOINT = `${import.meta.env.VITE_API_URL}/leaderboard`;

const LeaderboardPage = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(API_ENDPOINT, { withCredentials: true });
        setContributors(response.data.leaderboard || response.data || []);
      } catch (err) {
        setError('Failed to load leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading leaderboard...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return <Leaderboard contributors={contributors} />;
};

export default Leaderboard;



