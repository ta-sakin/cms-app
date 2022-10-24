import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const MobileDropDown = () => {
  const { currentUser: user, logout } = useAuth();
  const activeLink = "!bg-gray-700 !text-white";
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
                    <MobileDropDown />
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

export default MobileDropDown;
