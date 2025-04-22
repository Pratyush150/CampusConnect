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
    avatar: "/avatars/riya-sharma.jpg", // Link to mentor's avatar (optional)
    isAvailable: true, // Whether the mentor is available for mentorship
  },
  {
    name: "Arjun Verma", // Mentor's name
    title: "Data Scientist at Google", // Mentor's title and company position
    company: "Google", // Company the mentor works for
    category: "Data Science & AI", // Category of mentorship offered
    verified: true, // Whether the mentor is verified
    linkedin: "https://linkedin.com/in/arjun-verma", // LinkedIn profile link (optional)
    avatar: "/avatars/arjun-verma.jpg", // Link to mentor's avatar (optional)
    isAvailable: false, // Whether the mentor is available for mentorship
  },
  {
    name: "Ananya Roy", // Mentor's name
    title: "UX Designer at Zomato", // Mentor's title and company position
    company: "Zomato", // Company the mentor works for
    category: "UI/UX & Design", // Category of mentorship offered
    verified: false, // Whether the mentor is verified
    linkedin: "", // LinkedIn profile link (optional, empty if not provided)
    avatar: "/avatars/ananya-roy.jpg", // Link to mentor's avatar (optional)
    isAvailable: true, // Whether the mentor is available for mentorship
  },
  // Add more mentor objects as needed
];

// Export the mentors array for use in other components
export default mentors;

  