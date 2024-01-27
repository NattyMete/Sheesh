import React from "react";
import Sidebar from "../components/nav/SideBar";
import UserProfile from "../components/profile/UserProfile";
import NavBar from "../components/nav/NavBar";

const Profile = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="flex w-full h-full mx-auto border-2 justify-center">
        <Sidebar />
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
