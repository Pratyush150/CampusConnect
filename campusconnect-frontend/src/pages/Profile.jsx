import React from "react";
import StudentProfile from "./StudentProfile"; // Component for student profile
import MentorProfile from "./MentorProfile";   // Component for mentor profile

// Profile acts as a wrapper around both profile types
const Profile = ({ user, updateUserProfile, mentor, updateMentorProfile }) => {
  return (
    <div>
      {/* If user's role is student, show StudentProfile. Else show MentorProfile. */}
      {user?.role === "student" ? (
        <StudentProfile user={user} updateUserProfile={updateUserProfile} />
      ) : (
        <MentorProfile mentor={user} updateMentorProfile={updateMentorProfile} />
      )}
    </div>
  );
};

export default Profile;



