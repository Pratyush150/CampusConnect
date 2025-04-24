import React, { useState } from 'react';
import API from '../services/api';  // Ensure API is correctly set up for making API calls
import { useNavigate } from 'react-router-dom';

// Email validation function
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Password validation function (minimum 6 characters, at least one number, and one special character)
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const { name, email, password, college } = formData;

    // Check if any field is empty
    if (!name || !email || !password || !college) {
      setError('Please fill all required fields.');
      return false;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Validate password format
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form before submitting
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Send registration request to backend
      const response = await API.post('/auth/register', formData);

      // Check for success response
      if (response.status === 201 || response.status === 200) {
        // Redirect to a page indicating email verification is needed
        navigate('/verify-email-pending'); // You can replace this with any appropriate page
      } else {
        throw new Error('Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>

      {/* Error message display */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Registration form */}
      <form onSubmit={handleSubmit} autoComplete="off">
        {['name', 'email', 'password', 'college'].map((field) => (
          <input
            key={field}
            id={field}
            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
            name={field}
            value={formData[field]}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            onChange={handleChange}
            required
          />
        ))}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;






