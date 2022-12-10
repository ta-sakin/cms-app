import React from "react";
import { Link, NavLink } from "react-router-dom";
import MobileDropDown from "./MobileDropDown";
import DesktopBar from "./DesktopBar";

const Navbar = ({ className, user }) => {
  return (
    <div className="navbar sticky top-0 z-50 bg-gray-200 lg:justify-between px-10 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-y-1"
          >
            <MobileDropDown user={user} />
          </ul>
        </div>
        <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
          CCC App
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-x-1 p-0 ">
          <DesktopBar user={user} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
