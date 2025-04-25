import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

// Email validation
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Password validation
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // blank initially
    college: '',
    linkedin: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const { name, email, password, confirmPassword, role, college, linkedin } = formData;

    if (!name || !email || !password || !confirmPassword || !role) {
      setError('Please fill all required fields.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long, contain an uppercase letter, one number, and a special character.');
      return false;
    }

    if (role === 'student' && !college) {
      setError('College name is required for students.');
      return false;
    }

    if (role === 'mentor' && !linkedin) {
      setError('LinkedIn profile is required for mentors.');
      return false;
    }

    return true;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/auth/register', formData);

      if (response.status === 201 || response.status === 200) {
        navigate(`/verify-otp?email=${formData.email}`);
      } else {
        throw new Error('Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email Address"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        {/* Dropdown Role Selector */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>

        {/* Conditionally render based on role */}
        {formData.role === 'student' && (
          <input
            type="text"
            name="college"
            value={formData.college}
            placeholder="College Name"
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            onChange={handleChange}
          />
        )}

        {formData.role === 'mentor' && (
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            placeholder="LinkedIn Profile"
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            onChange={handleChange}
          />
        )}

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






