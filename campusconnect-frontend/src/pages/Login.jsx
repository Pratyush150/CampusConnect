import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ResendVerification from "../components/ResendVerification"; // Adjust path if moved

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    // Check for valid tokens and handle logout if needed
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile"); // Automatically navigate to profile if already logged in
    }
  }, [navigate]);

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      // Store access token in local storage and refresh token in cookies
      localStorage.setItem("token", res.data.token);
      document.cookie = `refreshToken=${res.data.refreshToken}; path=/; Secure; HttpOnly`;
      navigate("/profile");
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials, please try again.";
      setError(message);

      if (message.toLowerCase().includes("verify your email")) {
        setShowResend(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Log In</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleLogin} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {showResend && (
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-center text-gray-600 mb-2">
            Didn’t receive a verification email?
          </p>
          <ResendVerification />
        </div>
      )}
    </div>
  );
};

export default Login;










