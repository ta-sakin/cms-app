import axios from "axios";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = ({ details, refetch }) => {
  const handleStatus = async () => {
    try {
      const { data } = await axios.patch(`/admin/userstatus/${details._id}`, {
        status: details?.status === "active" ? "blocked" : "active",
      });
      if (data.acknowledged) {
        // setRefetch((prevState) => !prevState);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between mx-4 my-4">
        <p></p>
        {details.status === "active" ? (
          <p>
            <button className="btn btn-secondary btn-sm bg-red-400 border-none" onClick={handleStatus}>
              Block {details.name}
            </button>
          </p>
        ) : (
          <p>
            <button
              className="btn btn-accent btn-sm text-white"
              onClick={handleStatus}
            >
              Activate {details.name}
            </button>
          </p>
        )}
      </div>
      <div className="bg-gray-100 mx-4 h-fit py-10 flex md:flex-row flex-col justify-center flex-grow gap-8 items-center md:items-start">
        <div className="flex flex-col items-center">
          <FaUserCircle className="w-48 h-48 border-2 rounded-md border-gray-500 p-4 text-gray-500" />
        </div>
        <div className="grow sm:max-w-sm md:max-w-lg w-full px-6 mt-4 md:mt-0 md:px-0">
          <form className="">
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-700 text-sm md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="name"
                >
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={details?.name}
                  disabled
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-700 text-sm md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={details?.email}
                  disabled
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-700 text-sm md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="phone"
                >
                  Phone
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  value={details?.phone}
                  disabled
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-700 text-sm md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="ward"
                >
                  Ward
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  value={details?.ward}
                  name="ward"
                  type="ward"
                  id="ward"
                  disabled
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-700 text-sm md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="address"
                >
                  Address
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  value={details?.address}
                  name="address"
                  type="address"
                  id="address"
                  disabled
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
