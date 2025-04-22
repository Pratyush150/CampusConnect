import React, { useState } from "react";

const Hero = () => {
  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <section className="mt-20 text-center py-20 bg-gray-100 dark:bg-gray-800 transition-all duration-500 ease-in-out">
      {/* Main Heading */}
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 animate__animated animate__fadeIn">
        Connect. Collaborate. Grow.
      </h2>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Discover colleges, share resources, and engage with your student community.
      </p>

      {/* Buttons Section */}
      <div className="flex justify-center gap-6 animate__animated animate__fadeIn animate__delay-2s">
        {/* Get Started Button */}
        <button
          onClick={toggleModal} // Open sign-up modal
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Started
        </button>

        {/* Explore Colleges Button */}
        <a
          href="/explore-colleges" // Link to explore colleges page
          className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Explore Colleges
        </a>
      </div>

      {/* Modal for Sign-up (When 'Get Started' is clicked) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl w-80">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Sign Up to Get Started
            </h3>
            <form className="flex flex-col">
              <input
                type="text"
                placeholder="Enter your email"
                className="mb-3 p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Create a password"
                className="mb-3 p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>
            <button
              onClick={toggleModal}
              className="mt-4 text-sm text-gray-500 dark:text-gray-300 hover:text-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

