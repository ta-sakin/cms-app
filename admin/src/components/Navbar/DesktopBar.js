import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DesktopBar = ({ user }) => {
  const { logout } = useAuth();

  return (
    <>
      <li>
        <div className="h-12">
          <div className="flex cursor-pointer items-center rounded-md hover:border-none border-[2px] border-[#a1a2a6] space-x-1 px-3 h-10">
            <p className="sm:p-0 pr-4">Ward: {user?.ward}</p>
          </div>
        </div>
      </li>
      <li>
        <div className="h-12">
          <div className="flex cursor-pointer items-center rounded-md hover:border-none border-[2px] border-[#a1a2a6] space-x-1 px-3 h-10">
            <p className="sm:p-0 pr-4">
              {user?.name.includes(" ") ? user?.name.split(" ")[0] : user?.name}
            </p>
            <FaUserCircle className="text-2xl text-gray-500" />
          </div>
        </div>
      </li>
      <li>
        <div className="h-12">
          <button
            className="flex cursor-pointer justify-center items-center rounded-md  border-[1px] border-[#4c4c4c] bg-[#4c4c4c] space-x-1 font-semibold text-white h-10 px-3"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </li>
    </>
  );
};

export default DesktopBar;
