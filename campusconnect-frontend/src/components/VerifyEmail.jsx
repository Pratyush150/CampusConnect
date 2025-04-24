import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      // Call the backend to verify the email
      axios
        .get(`/api/auth/verify-email?token=${token}`)
        .then((response) => {
          setMessage('Email verified successfully! You can now log in.');
          setLoading(false);
          // Redirect to login page with the success message
          setTimeout(() => {
            navigate('/login?verified=true');
          }, 3000); // Redirect after 3 seconds
        })
        .catch((error) => {
          setMessage('Email verification failed. Please try again.');
          setLoading(false);
        });
    } else {
      setMessage('Invalid verification link.');
      setLoading(false);
    }
  }, [location.search, navigate]);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Email Verification
      </h2>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Verifying your email...</p>
      ) : (
        <div>
          <p className={message.includes('successfully') ? 'text-green-600' : 'text-red-600'}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

