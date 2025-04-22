// Import React and hooks
import React, { useState, useEffect } from "react";

// Base API URL from environment
const API_URL = import.meta.env.VITE_API_URL;

const CampusWall = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Fetch posts on mount
  useEffect(() => {
    fetch(`${API_URL}/campuswall`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => setPosts(data.reverse()))
      .catch((err) => console.error("❌ Error fetching posts:", err));
  }, []);

  // Create a new post
  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const postData = {
      user: "John Doe", // TODO: Replace with actual logged-in user
      college: "ABC College", // TODO: Replace with actual user college
      content: newPost,
    };

    fetch(`${API_URL}/campuswall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create post");
        return res.json();
      })
      .then((savedPost) => {
        setPosts([savedPost, ...posts]);
        setNewPost("");
      })
      .catch((err) => console.error("❌ Error creating post:", err));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🌐 CampusWall</h2>

      {/* Post input */}
      <div className="mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's happening in your world?"
          className="w-full p-4 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleCreatePost}
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Post
        </button>
      </div>

      {/* Render posts */}
      {posts.map((post) => (
        <div
          key={post._id || post.id}
          className="mb-5 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border dark:border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{post.user}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.college}</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-gray-800 dark:text-white">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CampusWall;


