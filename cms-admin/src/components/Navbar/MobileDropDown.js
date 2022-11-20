import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MobileDropDown = ({ user }) => {
  const { logout } = useAuth();
  return (
    <>
      <li className="lg:h-0">
        <div className="flex cursor-pointer items-center rounded-md hover:border-none border-[1px] border-[#570df8] space-x-1 p-1">
          <p className="sm:p-0 pr-4">Ward: {user?.ward}</p>
        </div>
      </li>

      <li>
        <div className="h-12">
          <div className="flex cursor-pointer items-center rounded-md hover:border-none border-[1px] border-[#570df8] space-x-1 p-1">
            <p className="sm:p-0 pr-4">
              {user?.name.includes(" ") ? user?.name.split(" ")[0] : user?.name}
            </p>
            <FaUserCircle className="text-3xl text-gray-500" />
          </div>
        </div>
      </li>
      <li className="lg:h-0">
        <Link to="/login" onClick={() => logout()}>
          Logout
        </Link>
      </li>
    </>
  );
};

export default MobileDropDown;
