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
    const token = getAuthToken(); // Function to get token from localStorage
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
        setAuthToken(newAccessToken);

        // Update the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Handle token refresh failure (e.g., log out user)
        removeAuthToken();
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // Reject other errors
  }
);

// Function to get the access token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Function to save the access token to localStorage
const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to remove the access token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem("token");
};

// Function to get refresh token from cookies (can be customized)
const getRefreshToken = () => {
  const name = "refreshToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  // Loop through cookies to find refreshToken
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim(); // Ensure no leading spaces
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length); // Extract refresh token value
    }
  }
  return "";
};

// Export the functions to make them available to other parts of your app
export { getAuthToken, setAuthToken, removeAuthToken, getRefreshToken };

export default api;


