// React imports
import React, { useState } from 'react';
import API from '../services/api'; // Axios instance for making API requests
import { useNavigate } from 'react-router-dom'; // For redirecting after successful signup

// ✅ Utility: Email validation regex
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email); // returns true if valid
};

// ✅ Utility: Password validation regex (uppercase, lowercase, digit, special char, min 6 chars)
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password); // returns true if password is strong
};

const Signup = () => {
  const navigate = useNavigate(); // Used for programmatic navigation

  // ✅ Form state setup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',           // student or mentor
    college: '',        // required only for student
    linkedin: '',       // required only for mentor
  });

  const [error, setError] = useState('');     // to show error message if any
  const [loading, setLoading] = useState(false); // shows loading text during API call

  // ✅ Handle input value change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Frontend form validation before submission
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

    // Conditional fields based on role
    if (role === 'student' && !college) {
      setError('College name is required for students.');
      return false;
    }

    if (role === 'mentor' && !linkedin) {
      setError('LinkedIn profile is required for mentors.');
      return false;
    }

    return true; // All validations passed
  };

  // ✅ Handle submit button click
  const handleSubmit = async (e) => {
    e.preventDefault();     // prevent page reload
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);   // stop loading if validation fails
      return;
    }

    try {
      // 👇 Send POST request to backend API for registration
      const response = await API.post('/auth/register', formData);

      // ✅ Redirect to OTP verification if registration is successful
      if (response.status === 201 || response.status === 200) {
        navigate(`/verify-otp?email=${formData.email}`);
      } else {
        throw new Error('Registration failed.');
      }
    } catch (err) {
      // 👇 Show error if API fails
      setError(err.response?.data?.message || err.message || 'An error occurred during sign-up.');
    } finally {
      setLoading(false); // hide loading spinner
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

        {/* Conditional: College input for students */}
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

        {/* Conditional: LinkedIn input for mentors */}
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






