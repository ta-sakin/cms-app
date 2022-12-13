import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/shared/Loading";
import useAdmin from "../../hooks/useAdmin";
import { IoIosArrowForward } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { HiDocumentDuplicate } from "react-icons/hi";

const Dashboard = () => {
  const [expand, setExpand] = useState(false);

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
        <div className="drawer-side">
          <label
            htmlFor="dashboard-sidebar "
            className="drawer-overlay"
          ></label>
          <ul className="menu p-2 cursor-pointer overflow-y-auto w-64 bg-gray-100 text-base-content pt-10 gap-y-1">
            <li>
              <NavLink
                onClick={() => setExpand(false)}
                to={"/dashboard"}
                className="font-semibold h-10"
              >
                <MdSpaceDashboard /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setExpand(false)}
                to="/muser"
                className="font-semibold h-10"
              >
                <FaUserCircle /> Manage User
              </NavLink>
            </li>
            <li>
              <NavLink to="mcomplains" className="font-semibold  h-10 ">
                <HiDocumentDuplicate className="text-xl" />
                Manage Complains
              </NavLink>
            </li>
            {/* <ul className={`${!expand && ""}`}>
              <li className="">
                <NavLink
                  to="mcomplains"
                  onClick={() => setExpand(!expand)}
                  className="font-semibold  h-10 "
                >
                  <HiDocumentDuplicate className="text-xl" />
                  <p className="w-full flex justify-between items-center">
                    Manage Complains
                    <IoIosArrowForward
                      className={`duration-200 ${
                        expand &&
                        "transition-transform mb-1 origin-left rotate-90"
                      }`}
                    />
                  </p>
                </NavLink>
              </li>
              {expand && (
                <ul className="h-24 ml-5 bg-gray-300 py-2 rounded-lg transition-all duration-500">
                  <li>
                    <NavLink
                      to="mcomplains/status"
                      className="font-semibold h-8 my-1"
                    >
                      By status
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/muser"
                      className="font-semibold h-8 bg-slate-400"
                    >
                      By status
                    </NavLink>
                  </li>
                </ul>
              )}
            </ul> */}
            <li>
              <NavLink
                onClick={() => setExpand(false)}
                to="/reports"
                className="font-semibold h-10"
              >
                <TbReportAnalytics className="text-xl" /> Reports
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/reports" className="font-semibold">
                Logout
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
