import React, { useState } from "react";
import StudentProfile from "./StudentProfile";
import MentorProfile from "./MentorProfile";

// Profile component acts as a parent to Student and Mentor profiles
const Profile = ({ user, updateUserProfile, mentor, updateMentorProfile }) => {
  return (
    <div>
      {user ? (
        <StudentProfile user={user} updateUserProfile={updateUserProfile} />
      ) : (
        <MentorProfile mentor={mentor} updateMentorProfile={updateMentorProfile} />
      )}
    </div>
  );
};

export default Profile;


