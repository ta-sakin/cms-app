import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const DesktopBar = () => {
  const { currentUser: user, logout } = useAuth();
  const activeLink = "!bg-gray-700 !text-white";
  let activeStyle = {
    textDecoration: "underline",
    textUnderlineOffset: "5px",
    color: "#000000",
    backgroundColor: "#e5e7eb",
  };
  let activeStyleProfile = {
    color: "#000000",
    backgroundColor: "#e5e7eb",
  };
  return (
    // <>
    //   {user ? (
    //     <>
    //       {/* <li>
    //         <NavLink  to="/dashboard" className="justify-between">
    //           Profile
    //         </NavLink >
    //       </li> */}
    //       <li>
    //         <span className="justify-between" onClick={() => logout()}>
    //           Logout
    //         </span>
    //       </li>
    //     </>
    //   ) : (
    //     <>
    //       <li>
    //         <NavLink  to="/login" className="justify-between">
    //           Login
    //         </NavLink >
    //       </li>
    //       <li>
    //         <NavLink  to="/register" className="justify-between">
    //           Register
    //         </NavLink >
    //       </li>
    //     </>
    //   )}
    // </>
    <>
      <li className="lg:h-0">
        <NavLink
          to="/home"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>
      </li>
      <li className="lg:h-0">
        <NavLink
          to="/mycomplain"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          My Complaints
        </NavLink>
      </li>
      <li className="lg:h-0">
        <NavLink
          to="/submitcomplain"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Submit Complaint
        </NavLink>
      </li>
      <>
        {user ? (
          <>
            <li>
              <NavLink
                to="/profile"
                className="h-12"
                style={({ isActive }) =>
                  isActive ? activeStyleProfile : undefined
                }
              >
                <div className="flex cursor-pointer items-center rounded-md hover:bg-[#d1d3d9] border-[2px] border-[#a1a2a6] space-x-2 py-1 px-2">
                  <p className="sm:p-0 pr-4">
                    {user?.displayName?.split(" ")[0]}
                  </p>
                  <FaUserCircle className="text-3xl text-gray-500" />
                </div>
              </NavLink>
            </li>
            {/* <div className="navbar-end hidden sm:flex">
                <div className="dropdown dropdown-end">
                  <label tabIndex="0" className="flex">
                    <p>{user.displayName.split(" ")[0]}</p>
                    <div className="flex cursor-pointer justify-center items-center hover:shadow-md">
                      <FaUserCircle className="text-3xl text-gray-500" />
                    </div>
                  </label>
                  {/* <ul
                    tabindex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <DesktopBar />
                  </ul> */}
            {/* </div> */}
            {/* </div> */}
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

export default DesktopBar;
