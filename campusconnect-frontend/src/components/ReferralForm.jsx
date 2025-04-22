import React, { useState } from 'react';

// Referral form to submit referrals
const ReferralForm = () => {
  const [referralEmail, setReferralEmail] = useState(''); // State to manage email input
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const [error, setError] = useState(''); // State to track form errors

  // Handle form submission
  const handleReferralSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate email format using regular expression
    const isValidEmail = /\S+@\S+\.\S+/;
    if (!isValidEmail.test(referralEmail)) {
      setError('Please enter a valid email address'); // Set error if email is invalid
      return;
    }

    // Handle referral submission (e.g., save to database, show message)
    alert(`Referral submitted for ${referralEmail}`); // Simulate referral submission
    setSubmitted(true); // Mark form as submitted
    setReferralEmail(''); // Clear the email input field
    setError(''); // Clear any previous error messages
  };

  return (
    <form onSubmit={handleReferralSubmit} className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Refer a Friend</h2>
      {/* Email input field */}
      <input
        type="email"
        placeholder="Friend's email"
        value={referralEmail}
        onChange={(e) => setReferralEmail(e.target.value)} // Update the email state
        className="px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white mt-4"
        required
      />
      {/* Display error message if the email is invalid */}
      {error && <p className="text-red-600 mt-2">{error}</p>} 

      {/* Submit button */}
      <button
        type="submit"
        className={`mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${submitted ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={submitted} // Disable button after submission
      >
        {submitted ? "Referral Submitted" : "Submit Referral"} {/* Show different text based on submission */}
      </button>
    </form>
  );
};

export default ReferralForm;

