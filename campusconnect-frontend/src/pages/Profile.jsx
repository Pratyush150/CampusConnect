import React from "react";
import StudentProfile from "../components/StudentProfile";
import MentorProfile from "../components/MentorProfile";

const Profile = ({ user, updateUserProfile, updateMentorProfile }) => {
  return (
    <div>
      {user?.role === "student" ? (
        <StudentProfile user={user} updateUserProfile={updateUserProfile} />
      ) : (
        <MentorProfile user={user} updateMentorProfile={updateMentorProfile} />
      )}
    </div>
  );
};

export default Profile;



