import React from "react";

// About section component
const About = () => {
  return (
    // Section with padding, light/dark support and full width
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-900 text-center">
      
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        About CampusConnect
      </h2>

      {/* Description paragraph */}
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        CampusConnect is your one-stop solution for discovering colleges near you,
        sharing valuable study resources, joining exciting events, and connecting
        with fellow students and alumni. Our goal is to build a stronger student community
        by making interaction and collaboration easier than ever.
      </p>
    </section>
  );
};

export default About;
