import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Importing API handler for backend requests

const ResendVerification = () => {
  const [email, setEmail] = useState(''); // User-entered email
  const [message, setMessage] = useState(''); // Success message
  const [error, setError] = useState(''); // Error message
  const [loading, setLoading] = useState(false); // Loading state
  const [cooldown, setCooldown] = useState(0); // Cooldown timer in seconds

  // Decrease cooldown timer every second
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Function to handle resend button click
  const handleResend = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    // Basic email validation
    if (!email) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      // API call to backend endpoint
      const res = await API.post('/auth/resend-verification', { email });
      setMessage(res.data.message || 'Verification email sent.');
      setCooldown(30); // Start 30-second cooldown
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Resend Verification Email
      </h3>

      <form onSubmit={handleResend}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <button
          type="submit"
          disabled={loading || cooldown > 0}
          className={`w-full p-2 rounded-lg transition ${
            loading || cooldown > 0
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading
            ? 'Sending...'
            : cooldown > 0
            ? `Wait ${cooldown}s`
            : 'Resend Verification Email'}
        </button>
      </form>

      {/* Aria-live region for screen readers */}
      <div aria-live="polite" className="mt-2">
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ResendVerification;



