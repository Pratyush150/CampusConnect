import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api"; // Ensure API is properly set up

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const verifyEmailToken = async (token) => {
    try {
      const res = await API.get(`/auth/verify-email?token=${token}`);
      setStatus(res.data.message || "Email verified successfully!");
      setTimeout(() => navigate("/login"), 5000); // Redirect after 5 sec
    } catch (err) {
      setError("Verification failed. The link may be expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      verifyEmailToken(token);
    } else {
      setError("Invalid or missing token.");
      setLoading(false);
    }
  }, [location]);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Email Verification</h2>
      {loading && <p className="text-gray-600 dark:text-gray-400">Verifying...</p>}
      {status && <p className="text-green-600">{status}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default VerifyEmail;
