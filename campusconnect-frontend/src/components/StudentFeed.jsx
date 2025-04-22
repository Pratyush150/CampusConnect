// src/components/StudentFeed.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api"; // Import your API utility

const StudentFeed = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the API (or use mock data)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts"); // Update with the correct endpoint
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              Posted by {post.user_name} at{" "}
              {new Date(post.created_at).toLocaleTimeString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentFeed;
