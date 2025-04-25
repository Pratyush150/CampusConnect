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
      autoVerifyOtp(otpFromUrl); // Trigger auto-verification if OTP is in URL
    }
  }, [otpFromUrl]);

  // Automatically verify OTP from URL
  const autoVerifyOtp = async (autoOtp) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Sending OTP to backend for verification (no redirection here)
      const res = await API.get(`/auth/verify-otp?otp=${autoOtp}`);
      setMessage(res.data.message || "OTP verified successfully");

      // React handles the redirect
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
      const res = await API.get(`/auth/verify-otp?otp=${otp}`);
      setMessage(res.data.message || "OTP verified successfully");
      setOtp("");

      setTimeout(() => navigate("/login"), 2000); // React handles the redirect
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
          <a
            href="#"
            onClick={handleResendOTP}
            className="text-blue-600 hover:text-blue-700"
            disabled={resendLoading}
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;





