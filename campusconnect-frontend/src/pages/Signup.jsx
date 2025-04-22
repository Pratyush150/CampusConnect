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

  const [collegeID, setCollegeID] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      setPreview(URL.createObjectURL(file));
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
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (collegeID) data.append('collegeID', collegeID);

    try {
      await API.post('/signup', data);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during sign-up.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {['name', 'email', 'password', 'college'].map((field, idx) => (
          <input
            key={idx}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-3 mb-4 border rounded-lg text-gray-800"
            onChange={handleChange}
          />
        ))}

        <div className="mb-4">
          <label htmlFor="collegeID" className="block text-gray-800 dark:text-white">Upload College ID</label>
          <input
            type="file"
            id="collegeID"
            accept="image/*"
            className="w-full p-3 border rounded-lg text-gray-800"
            onChange={handleIDUpload}
          />
          {preview && <img src={preview} alt="Preview" className="mt-2 rounded-lg max-w-xs" />}
        </div>

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



