import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Loading from "../components/shared/Loading";
import useUser from "../hooks/useUser";
import _ from "lodash";
import { toast } from "react-toastify";

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
        // const { name, email, address, ward, phone } = data;
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
      if (_.isEqual(profile, user)) return;
      const { data } = await axios.patch(
        `http://localhost:5000/api/user/${userId}`,
        profile,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setChanged(false);
      setUpdated(data);
      toast.success("Profile updated", { theme: "colored" });
    } catch (error) {}
  };

  return (
    <div>
      <div className="bg-gray-100 h-fit py-10 flex md:flex-row flex-col justify-center items-center flex-grow ">
        <div className="">
          <FaUserCircle className="w-40 h-40 border-2 rounded-md border-gray-500 p-4 text-gray-500" />
        </div>
        <div className="grow max-w-md">
          <form className="w-full">
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-700 text-sm md:text-right mb-1 md:mb-0 pr-4"
                  for="name"
                >
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
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
                  for="email"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
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
                  for="ward"
                >
                  Ward
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  onChange={handleChange}
                  value={ward}
                  name="address"
                  type="address"
                  id="address"
                  readOnly={!changed}
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-700 text-sm md:text-right mb-1 md:mb-0 pr-4"
                  for="address"
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
                />
              </div>
            </div>

            <div className="md:flex md:items-center justify-end">
              <div className="md:w-1/3"></div>
              {!changed ? (
                <div className="w-fit">
                  <button
                    className="btn-active btn-link btn btn-sm mr-2"
                    type="button"
                    onClick={handleEdit}
                  >
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
    </div>
  );
};

export default Profile;
