import axios from "axios";

// Set base URL from env or fallback to local
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensures cookies/session are sent if needed
});

// Attach JWT token from localStorage (if exists) to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors to catch expired tokens and refresh them
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 && // Unauthorized (token expired)
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Try to refresh the access token
      try {
        const refreshToken = getRefreshToken(); // Get refresh token from cookies
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true } // Send cookies along
        );

        const newAccessToken = response.data.token;
        // Save new access token to localStorage
        localStorage.setItem("token", newAccessToken);

        // Update the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Handle token refresh failure (e.g., log out user)
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // Reject other errors
  }
);

// Get refresh token from cookies (can also be implemented as per your cookie handling)
const getRefreshToken = () => {
  // Example: extract refreshToken from cookies (if set)
  const name = "refreshToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export default api;

