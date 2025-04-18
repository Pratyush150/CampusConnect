import React from "react";

const Hero = () => {
  return (
    <section className="mt-20 text-center py-20 bg-gray-100 dark:bg-gray-800">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Connect. Collaborate. Grow.
      </h2>
      
      {/* Subtitle */}
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Discover colleges, share resources, and engage with your student community.
      </p>
      
      {/* Buttons Section */}
      <div className="flex justify-center gap-4">
        {/* Get Started Button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
          Get Started
        </button>

        {/* Explore Colleges Button */}
        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white">
          Explore Colleges
        </button>
      </div>
    </section>
  );
};

export default Hero;

