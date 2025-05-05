import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import ResendVerification from "../components/ResendVerification";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
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
      const { token, refreshToken, user } = res.data;

      // Store access token in localStorage
      localStorage.setItem("token", token);
      // Store refresh token in cookie
      document.cookie = `refreshToken=${refreshToken}; path=/; Secure; SameSite=Lax`;

      // Update auth context and handle role-based redirection
      if (user) {
        login(token, user);
        if (user.role === "mentor") {
          navigate("/mentor-profile"); // Redirect to mentor profile
        } else {
          navigate("/student-profile"); // Redirect to student profile
        }
      } else {
        const userRes = await API.get("/users/me"); // Token already attached in interceptor
        login(token, userRes.data);
        if (userRes.data.role === "mentor") {
          navigate("/mentor-profile");
        } else {
          navigate("/student-profile");
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid credentials, please try again.";
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
          {loading ? (
            <div className="spinner-border animate-spin h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      {showResend && (
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-center text-gray-600 mb-2">
            Didn’t receive a verification email?
          </p>
          <ResendVerification email={email} />
        </div>
      )}
    </div>
  );
};

export default Login;











