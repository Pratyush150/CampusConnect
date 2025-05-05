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
  const [resendLoading, setResendLoading] = useState(false);

  // Get OTP from URL query parameter if present
  const queryParams = new URLSearchParams(location.search);
  const otpFromUrl = queryParams.get("otp");

  useEffect(() => {
    if (otpFromUrl) {
      setOtp(otpFromUrl);
      autoVerifyOtp(otpFromUrl); // Automatically verify if OTP exists in URL
    }
  }, [otpFromUrl]);

  // Auto-verify OTP from URL
  const autoVerifyOtp = async (autoOtp) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.get(`/auth/verify-otp?otp=${autoOtp}`);
      setMessage(res.data.message || "OTP verified successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Manual OTP submit
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("OTP is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.get(`/auth/verify-otp?otp=${otp}`);
      setMessage(res.data.message || "OTP verified successfully");
      setOtp("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP logic
  const handleResendOTP = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("User email not found. Please sign up again.");
      return;
    }

    setResendLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/resend-otp", { email });
      setMessage(res.data.message || "OTP resent successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Verify OTP
      </h2>

      {/* Display error or success messages */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

      <form onSubmit={handleVerifyOTP} autoComplete="off">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      {/* Resend OTP Section */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive an OTP?{" "}
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resendLoading}
            className="text-blue-600 hover:text-blue-700 disabled:opacity-50 underline ml-1"
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;






