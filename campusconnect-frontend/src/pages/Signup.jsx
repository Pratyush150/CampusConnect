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

  const [collegeIdImage, setCollegeIdImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIDUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCollegeIdImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const { name, email, password, college } = formData;
    if (!name || !email || !password || !college || !collegeIdImage) {
      setError('Please fill all required fields and upload your College ID.');
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

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('college', formData.college);
      data.append('collegeIdImage', collegeIdImage); // ✅ Must match backend field name

      const response = await API.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201 || response.status === 200) {
        navigate('/profile');
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
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
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

        <div className="mb-4">
          <label htmlFor="collegeIdImage" className="block text-gray-800 dark:text-white mb-2">
            Upload College ID
          </label>
          <input
            type="file"
            id="collegeIdImage"
            accept="image/*"
            className="w-full p-3 border rounded-lg text-gray-800"
            onChange={handleIDUpload}
            required
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








