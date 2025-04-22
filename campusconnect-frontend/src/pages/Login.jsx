import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate form fields
  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors
    setLoading(true);  // Set loading state to true

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Send login request to backend
      const res = await API.post("/auth/login", { email, password });

      // Save token in local storage
      localStorage.setItem("token", res.data.token);

      // Navigate to the profile page on successful login
      navigate("/profile");
    } catch (err) {
      // Set error message in case of failure
      setError(err.response?.data?.message || "Invalid credentials, please try again.");
    } finally {
      setLoading(false);  // Set loading state back to false
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Log In</h2>

      {/* Error message display */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleLogin} autoComplete="off">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;






