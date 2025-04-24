import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Retrieve the OTP from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const otpFromUrl = queryParams.get("otp");

  useEffect(() => {
    if (otpFromUrl) {
      setOtp(otpFromUrl);  // Pre-populate OTP from URL if available
    }
  }, [otpFromUrl]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!otp) {
      setError("OTP is required.");
      setLoading(false);
      return;
    }

    try {
      // Send OTP to backend for verification using GET method
      const res = await API.get(`/auth/verify-otp?otp=${otp}`);
      setMessage(res.data.message); // Success message from backend

      // Redirect to login page after OTP verification
      setTimeout(() => navigate("/login"), 5000); // Redirect after 5 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const email = localStorage.getItem("userEmail");  // Assuming you stored the email during registration
    if (!email) {
      setError("User email not found.");
      return;
    }

    try {
      const res = await API.post("/auth/resend-otp", { email });
      setMessage(res.data.message); // Success message after OTP resend
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Verify OTP</h2>

      {/* Display error message if exists */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      {/* Display success message if exists */}
      {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

      <form onSubmit={handleVerifyOTP} autoComplete="off">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      {/* Link to resend OTP */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive an OTP? 
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700"
            onClick={handleResendOTP}
          >
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;

