import React from "react";
import StudentProfile from "../components/StudentProfile";
import MentorProfile from "../components/MentorProfile";

const Profile = ({ user, updateUserProfile, updateMentorProfile }) => {
  return (
    <div>
     {user?.type === "STUDENT" ? (
    <StudentProfile user={user} updateUserProfile={updateUserProfile} />
     ) : (
   <MentorProfile user={user} updateMentorProfile={updateMentorProfile} />
    )}

    </div>
  );
};

export default Profile;



