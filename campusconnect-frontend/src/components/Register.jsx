import React, { useState } from "react";
import API from "../services/api"; // Make sure this is correctly set up for API calls
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register", { name, email, password });
      setMessage(res.data.message); // success message from the backend
      setTimeout(() => navigate("/login"), 5000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
      <form onSubmit={handleRegister} autoComplete="off">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-700">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
