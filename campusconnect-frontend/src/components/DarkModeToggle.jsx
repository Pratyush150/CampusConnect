import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Importing icons for dark/light mode

const DarkModeToggle = () => {
  // State to track whether dark mode is enabled or not
  const [darkMode, setDarkMode] = useState(false);

  // useEffect to add or remove 'dark' class on the <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); // Enable dark mode
    } else {
      document.documentElement.classList.remove("dark"); // Revert to light mode
    }
  }, [darkMode]); // Dependency array ensures the effect runs only when darkMode changes

  // Toggle between dark and light mode
  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode); // Toggle the state
  };

  return (
    <button
      onClick={toggleMode} // When clicked, toggle between dark and light mode
      className="p-2 rounded-full border border-gray-400 dark:border-white transition duration-300"
    >
      {/* Display Sun icon for dark mode and Moon icon for light mode */}
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default DarkModeToggle;
