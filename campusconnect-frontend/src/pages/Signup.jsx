import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
  });

  const [collegeID, setCollegeID] = useState(null); // File input for College ID
  const [preview, setPreview] = useState(""); // Image preview
  const [error, setError] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIDUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCollegeID(file);
      setPreview(URL.createObjectURL(file)); // Live preview of the uploaded image
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Start loading

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const data = new FormData(); // Use FormData to include the file
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('college', formData.college);
    if (collegeID) data.append('collegeID', collegeID);

    try {
      await API.post('/signup', data);
      navigate('/profile'); // Redirect to profile on successful signup
    } catch (err) {
      setError('An error occurred during sign-up.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name, Email, Password Fields */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
        />
        <input
          type="text"
          name="college"
          placeholder="College Name"
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          onChange={handleChange}
        />

        {/* College ID Upload */}
        <div className="mb-4">
          <label htmlFor="collegeID" className="block text-gray-800 dark:text-white">Upload College ID</label>
          <input
            type="file"
            id="collegeID"
            accept="image/*"
            className="w-full p-3 border rounded-lg text-gray-800"
            onChange={handleIDUpload}
          />
          {preview && <img src={preview} alt="College ID Preview" className="mt-2 rounded-lg max-w-xs" />}
        </div>

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



