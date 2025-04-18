// Import React and useState, useEffect for state and fetching
import React, { useState, useEffect } from "react";

// Main component
const CampusWall = () => {
  // State to hold all posts fetched from the backend
  const [posts, setPosts] = useState([]);

  // State for new post text input
  const [newPost, setNewPost] = useState("");

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/campuswall")
      .then((res) => res.json())
      .then((data) => setPosts(data.reverse())) // show latest first
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Function to handle post creation
  const handleCreatePost = () => {
    if (newPost.trim()) {
      const postData = {
        user: "John Doe", // replace with actual logged in user
        college: "ABC College", // replace with user's college
        content: newPost,
      };

      // Send the post to the backend
      fetch("http://localhost:5000/api/campuswall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((savedPost) => {
          // Add the new post to the top of the post list
          setPosts([savedPost, ...posts]);
          setNewPost(""); // Clear input
        })
        .catch((err) => console.error("Error creating post:", err));
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🌐 CampusWall</h2>

      {/* Text area to create a post */}
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

      {/* Display all posts */}
      {posts.map((post) => (
        <div
          key={post._id}
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

