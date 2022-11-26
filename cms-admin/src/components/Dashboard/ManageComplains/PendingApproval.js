import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ButtonSpin from "../../shared/ButtonSpin";
const defaultValue = {
  name: "",
  email: "",
  contact: "",
  designation: "",
  remarks: "",
};
const PendingApproval = ({ complain }) => {
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assign, setAssign] = useState(defaultValue);
  const { name, email, contact, designation, remarks } = assign;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/admin/assign/${complain._id}`);
        if (Object.keys(data).length < 1) {
          setAssign(defaultValue);
        } else {
          setAssign(data);
        }
      } catch (error) {}
    })();
  }, [complain]);

  const handleChange = (e) => {
    setAssign({ ...assign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/admin/assign", {
        complain_id: complain._id,
        status_type: "verification",
        ...assign,
      });
      console.log(data);
      if (data.acknowledged) {
        setLoading(false);
        setAssign(defaultValue);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div
        className="cursor-pointer bg-gray-500 rounded-lg px-4 hover:bg-gray-600 flex justify-between items-center h-fit"
        onClick={() => setExpand(!expand)}
      >
        <p className="text-white font-semibold py-2">Assign For Verificaion</p>
        <IoIosArrowForward
          className={`duration-200 text-white ${
            expand && "transition-transform mb-2 origin-left rotate-90"
          }`}
        />
      </div>
      {expand && (
        <div className="bg-gray-50">
          <p className="text-center font-semibold pt-4">Assign To:</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5 mx-6">
              <label htmlFor="name">
                <p className="text-sm text-slate-700 pb-1">Full Name</p>
                <input
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  autoComplete="name"
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              <label htmlFor="email">
                <p className="text-sm text-slate-700 pb-1">Email</p>
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Email address"
                />
              </label>
              <label htmlFor="contact">
                <p className="text-sm text-slate-700 pb-1">Contact</p>
                <input
                  onChange={handleChange}
                  id="contact"
                  name="contact"
                  type="contact"
                  value={contact}
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Phone number"
                />
              </label>
              <label htmlFor="designation">
                <p className="text-sm text-slate-700 pb-1">Designation</p>
                <input
                  onChange={handleChange}
                  id="designation"
                  name="designation"
                  type="designation"
                  value={designation}
                  autoComplete="designation"
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              <label htmlFor="remarks">
                <p className="text-sm text-slate-700 pb-1">Admin Remarks</p>
                <textarea
                  onChange={handleChange}
                  id="remarks"
                  name="remarks"
                  type="remarks"
                  value={remarks}
                  autoComplete="remarks"
                  rows={3}
                  className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Admin remarks"
                />
              </label>
              {!loading ? (
                <button
                  type="submit"
                  id="save"
                  className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <span>Save & Generate Pdf</span>
                </button>
              ) : (
                <button
                  className="w-full mt-4 py-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center disabled"
                  disabled
                >
                  <ButtonSpin />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PendingApproval;
