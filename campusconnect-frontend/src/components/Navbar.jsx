import React, { useState } from "react";
import { Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track the menu visibility

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">CampusConnect</span>
          </div>

          {/* Right side: Theme Toggle, Sign Up, Explore */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Sign Up link */}
            <Link
              to="/signup"
              className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-500 dark:hover:text-white text-sm font-medium"
              aria-label="Go to Sign Up page"
            >
              Sign Up
            </Link>

            {/* Explore Button */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Explore
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-4">
          <Link
            to="/signup"
            className="block px-4 py-2 text-gray-800 dark:text-white"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
          <button
            onClick={toggleMenu}
            className="block px-4 py-2 text-gray-800 dark:text-white"
          >
            Explore
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
