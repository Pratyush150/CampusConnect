import React, { useState } from "react";
import StudentProfile from "./StudentProfile";
import MentorProfile from "./MentorProfile";



// Profile component acts as a parent to Student and Mentor profiles
const Profile = ({ user, updateUserProfile, mentor, updateMentorProfile }) => {
  return (
    <div>
     {user?.role === "student" ? (
  <StudentProfile user={user} updateUserProfile={updateUserProfile} />
) : (
  <MentorProfile mentor={user} updateMentorProfile={updateMentorProfile} />
)}

    </div>
  );
};

export default Profile;


