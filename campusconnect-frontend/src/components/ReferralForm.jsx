import React, { useState } from 'react';

// Referral form to submit referrals
const ReferralForm = () => {
  const [referralEmail, setReferralEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    // Validate email format
    const isValidEmail = /\S+@\S+\.\S+/;
    if (!isValidEmail.test(referralEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    // Handle referral submission (e.g., save to database, show message)
    alert(`Referral submitted for ${referralEmail}`);
    setSubmitted(true);
    setReferralEmail('');
    setError('');
  };

  return (
    <form onSubmit={handleReferralSubmit} className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Refer a Friend</h2>
      <input
        type="email"
        placeholder="Friend's email"
        value={referralEmail}
        onChange={(e) => setReferralEmail(e.target.value)}
        className="px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white mt-4"
        required
      />
      {error && <p className="text-red-600 mt-2">{error}</p>} {/* Display error message */}
      
      <button
        type="submit"
        className={`mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${submitted ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={submitted}
      >
        {submitted ? "Referral Submitted" : "Submit Referral"}
      </button>
    </form>
  );
};

export default ReferralForm;
