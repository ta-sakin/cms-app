import axios from "axios";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Loading from "../components/shared/Loading";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [user] = useAdmin();
  if (!user?.email) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar className="lg:px-16 px-8 z-50" user={user} />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-sidebar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <div className="ml-3">
            <label htmlFor="dashboard-sidebar" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 text-purple-500 w-5"
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
            <Outlet />
          </div>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="dashboard-sidebar "
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 cursor-pointer overflow-y-auto w-64 bg-gray-100 text-base-content pt-10 gap-y-2">
            <li>
              <NavLink to="/" className="font-semibold">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/muser" className="font-semibold">
                Manage User
              </NavLink>
            </li>
            <li>
              <NavLink to="/mcomplain" className="font-semibold">
                Manage Complaints
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className="font-semibold">
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className="font-semibold">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
