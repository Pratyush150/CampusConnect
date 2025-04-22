import React from "react";

// About section component
const About = () => {
  return (
    // Section with padding, light/dark support, full width, and centered content
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-900 text-center">
      
      {/* About Container with enhanced shadow and padding */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-gray-700">
        
        {/* Heading with enhanced typography */}
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800 dark:text-white">
          About CampusConnect
        </h2>

        {/* Description paragraph with updated color scheme for readability */}
        <p className="text-lg text-gray-700 dark:text-gray-300">
          CampusConnect is your one-stop solution for discovering colleges near you,
          sharing valuable study resources, joining exciting events, and connecting
          with fellow students and alumni. Our goal is to build a stronger student community
          by making interaction and collaboration easier than ever.
        </p>
        
      </div>
    </section>
  );
};

export default About;
