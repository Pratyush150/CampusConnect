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

  // Get the 'otp' value from URL query param
  const queryParams = new URLSearchParams(location.search);
  const otpFromUrl = queryParams.get("otp");

  useEffect(() => {
    if (otpFromUrl) {
      setOtp(otpFromUrl);
      autoVerifyOtp(otpFromUrl);
    }
  }, [otpFromUrl]);

  // Automatically verify OTP from URL
  const autoVerifyOtp = async (autoOtp) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Use POST for security
      const res = await API.post(`/auth/verify-otp`, { otp: autoOtp });
      setMessage(res.data.message || "OTP verified successfully");

      // Clear stored email after success
      localStorage.removeItem("userEmail");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Manual OTP verification from form
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
      // Use POST for security
      const res = await API.post(`/auth/verify-otp`, { otp });
      setMessage(res.data.message || "OTP verified successfully");
      setOtp("");
      localStorage.removeItem("userEmail");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("User email not found.");
      return;
    }

    setResendLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/resend-otp", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Verify OTP</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive an OTP?{" "}
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-blue-600 hover:text-blue-700 underline"
            disabled={resendLoading}
            style={{ background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer" }}
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;






