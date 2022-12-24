import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import Loading from "../components/shared/Loading";
import useUser from "../hooks/useUser";
import _ from "lodash";
import { toast } from "react-toastify";
import Dashboard from "../components/Profile/Dashboard";

const defaulValues = {
  name: "",
  email: "",
  phone: "",
  ward: "",
  address: "",
};

const Profile = () => {
  const [userId] = useUser();
  const [profile, setProfile] = useState(defaulValues);
  const { name, email, phone, ward, address } = profile;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [updated, setUpdated] = useState({});

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `http://localhost:5000/api/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProfile(data);
        setUser(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [userId, updated]);

  if (loading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleEdit = () => {
    setChanged(true);
  };

  const handleCancel = () => {
    setChanged(false);
    setProfile(user);
  };
  const handleSave = async () => {
    try {
      if (!name || !email || !ward || !address) {
        console.log({ name, email, ward, address });
        toast.error("All fields are required");
        return;
      }
      if (!email.includes("@")) {
        toast.error("Please enter a valid email");
        return;
      }
      setChanged(false);
      if (_.isEqual(profile, user)) {
        toast.success("You didn't make any changes.");
        return;
      }
      const { data } = await axios.patch(
        `http://localhost:5000/api/user/${userId}`,
        { name, email, ward, address },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setUpdated(data);
      toast.success("Profile updated", { theme: "colored" });
    } catch (error) {}
  };

  return (
    <div>
      <div className="bg-gray-100 h-fit py-10 flex md:flex-row flex-col justify-center  flex-grow gap-8 items-center md:items-start">
        <div className="flex flex-col items-center">
          <FaUserCircle className="w-48 h-48 border-2 rounded-md border-gray-500 p-4 text-gray-500" />
          <button
            className="mt-2 btn-outline btn btn-sm flex items-center justify-center gap-1"
            type="button"
            // onClick={handleEdit}
          >
            <FaEdit />
            Update Profile
          </button>
        </div>
        <div className="grow md:max-w-lg w-full px-6 mt-4 md:mt-0 md:px-0">
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
                  required
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  readOnly={!changed}
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
                  required
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  readOnly={!changed}
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
                  onChange={handleChange}
                  id="phone"
                  name="phone"
                  type="phone"
                  value={phone}
                  readOnly
                  className="w-full bg-gray-50 text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
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
                  required
                  onChange={handleChange}
                  value={ward}
                  name="ward"
                  type="ward"
                  id="ward"
                  readOnly={!changed}
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
                  onChange={handleChange}
                  value={address}
                  name="address"
                  type="address"
                  id="address"
                  readOnly={!changed}
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end ">
              <div className="w-1/3"></div>
              {!changed ? (
                <div className="w-fit">
                  <button
                    className="btn btn-outline btn-sm flex items-center justify-center gap-1"
                    type="button"
                    onClick={handleEdit}
                  >
                    <FaEdit />
                    Edit
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-fit">
                    <button
                      className="btn-ghost btn btn-sm mr-2"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="w-fit">
                    <button
                      className="btn-active btn btn-sm px-3"
                      type="button"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10">
        <Dashboard userId={userId} />
      </div>
    </div>
  );
};

export default Profile;
