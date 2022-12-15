import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const MobileDropDown = () => {
  const { currentUser: user, logout } = useAuth();
  const activeLink = "!bg-gray-700 !text-white";
  return (
    <>
      <li className="lg:h-0">
        <NavLink to="/home">Home</NavLink>
      </li>
      <li className="lg:h-0">
        <NavLink to="/mycomplain">My Complain</NavLink>
      </li>
      <li className="lg:h-0">
        <NavLink to="/submitcomplain">Submit Complain</NavLink>
      </li>
      <>
        {user ? (
          <>
            <li>
              <NavLink to="/profile" className="h-12">
                <div className="flex cursor-pointer items-center rounded-md hover:border-none border-[1px] border-[#570df8] space-x-1 p-1">
                  <p className="sm:p-0 pr-4">
                    {user.displayName.split(" ")[0]}
                  </p>
                  <FaUserCircle className="text-3xl text-gray-500" />
                </div>
              </NavLink>
            </li>
            <li className="lg:h-0">
              <Link to="" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li className="lg:h-12">
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </>
    </>
  );
};

export default MobileDropDown;
