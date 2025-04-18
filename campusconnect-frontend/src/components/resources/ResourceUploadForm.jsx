// src/components/resources/ResourceUploadForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ResourceUploadForm = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [category, setCategory] = useState('');

  const [message, setMessage] = useState(null); // Success or error message

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored here

      const res = await axios.post(
        '/api/resources/upload',
        { title, description, fileUrl, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('✅ Resource uploaded successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setFileUrl('');
      setCategory('');
    } catch (error) {
      setMessage('❌ Failed to upload resource. Try again.');
      console.error('Upload Error:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">📚 Upload Study Resource</h2>

      {message && (
        <div className="text-center mb-4 text-sm text-blue-600 dark:text-blue-300">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="File URL (e.g., Google Drive, PDF link)"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          required
        />

        <select
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Notes">Notes</option>
          <option value="Assignments">Assignments</option>
          <option value="Papers">Question Papers</option>
          <option value="Books">Books</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Upload Resource
        </button>
      </form>
    </div>
  );
};

export default ResourceUploadForm;
