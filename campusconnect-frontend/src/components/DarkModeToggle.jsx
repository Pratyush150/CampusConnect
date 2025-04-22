import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Importing icons for dark/light mode

const DarkModeToggle = () => {
  // State to track whether dark mode is enabled or not
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Update theme in localStorage and toggle the dark/light mode on <html> tag
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode); // Save theme preference to localStorage
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle between dark and light mode
  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleMode} // When clicked, toggle between dark and light mode
      aria-label="Toggle Dark/Light Mode"
      className="p-2 rounded-full border border-gray-400 dark:border-white transition duration-300"
    >
      {/* Display Sun icon for dark mode and Moon icon for light mode */}
      {darkMode ? (
        <Sun size={20} className="transition-transform transform rotate-180" />
      ) : (
        <Moon size={20} className="transition-transform transform rotate-0" />
      )}
    </button>
  );
};

export default DarkModeToggle;

