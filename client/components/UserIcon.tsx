// src/components/UserIcon.tsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserIcon = () => {
  return (
    <div className="absolute top-4 right-4">
      <FaUserCircle className="text-[#a41e63] text-3xl cursor-pointer hover:text-white" />
    </div>
  );
};

export default UserIcon;
