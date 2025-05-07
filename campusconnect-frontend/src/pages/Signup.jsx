import React, { useState } from 'react';
import API from '../services/api'; // Your Axios instance
import { useNavigate } from 'react-router-dom';

// Email validation regex
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Password validation regex (uppercase, lowercase, digit, special char, min 6 chars)
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

// LinkedIn validation
const validateLinkedIn = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  return regex.test(url);
};

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: '',      // 'STUDENT' or 'MENTOR'
    college: '',   // required for students
    linkedin: '',  // required for mentors
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input value change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Frontend form validation before submission
  const validateForm = () => {
    const { name, email, password, confirmPassword, type, college, linkedin } = formData;

    if (!name || !email || !password || !confirmPassword || !type) {
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

    if (!['STUDENT', 'MENTOR'].includes(type)) {
      setError('Please select a valid role.');
      return false;
    }

    if (type === 'STUDENT' && !college) {
      setError('College name is required for students.');
      return false;
    }

    if (type === 'MENTOR') {
      if (!linkedin) {
        setError('LinkedIn profile is required for mentors.');
        return false;
      }
      if (!validateLinkedIn(linkedin)) {
        setError('Please enter a valid LinkedIn profile URL.');
        return false;
      }
    }

    return true;
  };

  // Handle submit button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Prepare payload for backend
      const payload = {
        ...formData,
        // If your backend expects 'role' instead of 'type', adjust here:
        // role: formData.type
      };

      const response = await API.post('/auth/register', payload);

      if (response.status === 201 || response.status === 200) {
        navigate(`/verify-otp?email=${formData.email}&type=${formData.type}`);
      } else {
        throw new Error('Registration failed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'An error occurred during sign-up.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>

      {/* Error message (if any) */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email Address"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
          required
        />

        {/* Role Dropdown */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="STUDENT">Student</option>
          <option value="MENTOR">Mentor</option>
        </select>

        {/* Conditional: College input for students */}
        {formData.type === 'STUDENT' && (
          <input
            type="text"
            name="college"
            value={formData.college}
            placeholder="College Name"
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            onChange={handleChange}
            required
          />
        )}

        {/* Conditional: LinkedIn input for mentors */}
        {formData.type === 'MENTOR' && (
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            placeholder="LinkedIn Profile URL (e.g. https://linkedin.com/in/yourprofile)"
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            onChange={handleChange}
            required
            pattern="https?://(www\.)?linkedin\.com/in/.*"
          />
        )}

        {/* Submit Button */}
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







