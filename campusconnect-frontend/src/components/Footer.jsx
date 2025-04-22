import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Social media icons
import { Link } from "react-router-dom"; // ✅ Corrected quote

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center sm:text-left">
        {/* Brand Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">CampusConnect</h3>
          <p className="text-sm text-gray-400">
            Empowering students to connect, collaborate, and grow together. 🚀
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2">Connect With Us</h4>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter/Feedback */}
<div className="mt-6">
  <h4 className="font-semibold mb-2">Stay Updated</h4>
  <form
    onSubmit={(e) => e.preventDefault()}
    className="flex flex-col sm:flex-row gap-2"
  >
    <input
      type="email"
      placeholder="Enter your email"
      className="px-3 py-2 rounded-md text-black dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full sm:w-auto flex-1"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Subscribe
    </button>
  </form>
</div>


      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-400 mt-6 border-t border-gray-600 pt-3">
        © 2025 CampusConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

