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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIDUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCollegeID(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.college) {
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

    try {
      let collegeIdImageUrl = null;

      if (collegeID) {
        const timestamp = Math.floor(Date.now() / 1000);
        const publicId = `${timestamp}_collegeId`;
        const folder = 'CampusConnect/collegeIds';

        const backendURL = import.meta.env.VITE_API_URL;
        const sigRes = await fetch(`${backendURL}/cloudinary/signature`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: publicId, timestamp, folder }),
        });

        if (!sigRes.ok) throw new Error('Failed to get Cloudinary signature.');
        const { signature } = await sigRes.json();

        const formDataImage = new FormData();
        formDataImage.append('file', collegeID);
        formDataImage.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
        formDataImage.append('timestamp', timestamp);
        formDataImage.append('public_id', publicId);
        formDataImage.append('folder', folder);
        formDataImage.append('signature', signature);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formDataImage,
          }
        );

        if (!uploadRes.ok) throw new Error('Image upload failed.');
        const uploaded = await uploadRes.json();
        collegeIdImageUrl = uploaded.secure_url;
      }

      const registerRes = await API.post('/auth/register', {
        ...formData,
        collegeIdImage: collegeIdImageUrl,
      });

      if (registerRes.status === 201 || registerRes.status === 200) {
        navigate('/profile');
      } else {
        throw new Error('Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
            autoComplete="off"
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








