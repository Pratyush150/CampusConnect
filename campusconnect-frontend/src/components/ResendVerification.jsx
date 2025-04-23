import React, { useState } from 'react';
import API from '../services/api';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/resend-verification', { email });
      setMessage(res.data.message || 'Verification email sent.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Resend Verification Email</h3>
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
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ResendVerification;

