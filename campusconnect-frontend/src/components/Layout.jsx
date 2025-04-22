import React, { useEffect } from "react";
import Navbar from "./Navbar"; // Your existing Navbar component
import Footer from "./Footer"; // The enhanced Footer component
import { Outlet, useLocation } from "react-router-dom"; // Used to render current page and handle location-based changes
import { Helmet } from "react-helmet"; // For SEO/meta tag management

const Layout = () => {
  const location = useLocation();

  // Dynamically set the page title and meta tags based on the current route
  useEffect(() => {
    document.title = "CampusConnect - Your College Hub";
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ease-in-out duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow px-4 sm:px-8 py-6 max-w-screen-xl mx-auto">
        {/* SEO Meta Tags for Each Route */}
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="CampusConnect - Discover internships, events, and connect with mentors." />
          <meta name="keywords" content="college, internships, mentorship, study resources, CampusConnect" />
          <meta name="author" content="CampusConnect Team" />
        </Helmet>

        <Outlet /> {/* This renders the current route page */}
      </main>

      {/* Footer with newsletter and links */}
      <Footer />
    </div>
  );
};

export default Layout;

