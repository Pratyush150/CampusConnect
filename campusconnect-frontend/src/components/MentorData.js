// src/components/MentorMap/MentorData.js

// Array of mentor objects, each containing relevant information
const mentors = [
  {
    name: "Riya Sharma", // Mentor's name
    title: "SDE at Microsoft", // Mentor's title and company position
    company: "Microsoft", // Company the mentor works for
    category: "Programming & Development", // Category of mentorship offered
    verified: true, // Whether the mentor is verified
    linkedin: "https://linkedin.com/in/riya-sharma", // LinkedIn profile link (optional)
  },
  {
    name: "Arjun Verma", // Mentor's name
    title: "Data Scientist at Google", // Mentor's title and company position
    company: "Google", // Company the mentor works for
    category: "Data Science & AI", // Category of mentorship offered
    verified: true, // Whether the mentor is verified
    linkedin: "https://linkedin.com/in/arjun-verma", // LinkedIn profile link (optional)
  },
  {
    name: "Ananya Roy", // Mentor's name
    title: "UX Designer at Zomato", // Mentor's title and company position
    company: "Zomato", // Company the mentor works for
    category: "UI/UX & Design", // Category of mentorship offered
    verified: false, // Whether the mentor is verified
    linkedin: "", // LinkedIn profile link (optional, empty if not provided)
  },
  // You can continue adding more mentor objects here as needed
];

// Export the mentors array for use in other components
export default mentors;

  