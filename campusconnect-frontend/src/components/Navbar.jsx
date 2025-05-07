import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, LogOut } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use your global auth context

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, setUser } = useAuth(); // Use AuthContext for global state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Always check for token presence
  const isLoggedIn = !!localStorage.getItem("token");

  // Optional: update on location change (for SPAs)
  useEffect(() => {}, [location]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear user from context
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CampusConnect
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isLoggedIn ? (
              <>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white rounded-md"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Sign Up Button */}
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-500 dark:hover:text-white text-sm font-medium"
                  aria-label="Go to Sign Up page"
                >
                  Sign Up
                </Link>
                {/* Explore Button */}
                <button
                  onClick={closeMenu}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  aria-label="Explore CampusConnect"
                >
                  Explore
                </button>
              </>
            )}
          </div>

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
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-4 transition-all duration-300 ease-in-out">
          {!isLoggedIn && (
            <Link
              to="/signup"
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              Sign Up
            </Link>
          )}
          <button
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            Explore
          </button>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;



