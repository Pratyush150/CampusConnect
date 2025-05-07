import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ResendVerification from "../components/ResendVerification";
import { jwtDecode } from "jwt-decode"; // Added for role-based routing

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) handleExistingToken(token);
  }, []);

  const handleExistingToken = (token) => {
    try {
      const { role } = jwtDecode(token);
      navigate(role === "MENTOR" ? "/mentor-dashboard" : "/student-dashboard");
    } catch {
      localStorage.removeItem("token");
    }
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return false;
    }
    if (!validateEmail(email)) {
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
      const res = await API.post("/auth/login", formData);
      const { token, refreshToken } = res.data;

      // Store tokens
      localStorage.setItem("token", token);
      document.cookie = `refreshToken=${refreshToken}; Path=/; Secure; SameSite=Strict${
        import.meta.env.PROD ? "; HttpOnly" : ""
      }`;

      // Role-based redirection
      const { role } = jwtDecode(token);
      navigate(role === "MENTOR" ? "/mentor-profile" : "/student-profile");
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || "login_failed";
      handleLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (errorCode) => {
    const errors = {
      invalid_credentials: "Invalid email or password",
      unverified_email: "Please verify your email first",
      login_failed: "Login failed. Please try again later."
    };
    
    setError(errors[errorCode] || errors.login_failed);
    setShowResend(errorCode === "unverified_email");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Log In
      </h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          autoComplete="username"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          autoComplete="current-password"
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
          <ResendVerification email={formData.email} />
        </div>
      )}
    </div>
  );
};

// Reuse from shared utilities
const validateEmail = (email) => 
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export default Login;










