// Drawer
// https://codesandbox.io/s/react-side-drawer-np0jwf?fontsize=14&hidenavigation=1&theme=dark&file=/src/components/Backdrop.css

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ButtonSpin from "../../shared/ButtonSpin";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import PDFTemplate from "./PDFTemplate";

const defaultValue = {
  name: "",
  email: "",
  contact: "",
  designation: "",
  remarks: "",
};

const PendingApproval = ({ complain, drawer = false, setRefetchComplain }) => {
  const [expand, setExpand] = useState(true);
  const [loading, setLoading] = useState(false);
  const [assign, setAssign] = useState(defaultValue);
  const { name, email, contact, designation, remarks } = assign;
  const [assigned, setAssigned] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [refetch, setRefetch] = useState(false);
  // const []
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/admin/assign?cid=${complain._id}&status=verification`
        );
        if (Object.keys(data).length < 1) {
          setAssign(defaultValue);
          setUpdated(true);
          setLoading(false);
        } else {
          setLoading(false);
          setAssign(data);
          setAssigned(true);
          setUpdated(false);
        }
      } catch (error) {}
    })();
  }, [complain, refetch]);

  const handleChange = (e) => {
    setUpdated(true);
    setAssign({ ...assign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!assigned) {
        setLoading(true);
        const { data } = await axios.post("/admin/assign", {
          complain_id: complain._id,
          status_type: "verification",
          date_status_start: "in verification start",
          complain_status: "in verification",
          ...assign,
        });
        if (data.acknowledged) {
          setLoading(false);
          setAssign(defaultValue);
          toast.success("Complain assigned successfully", {
            toastId: "success",
          });
          setRefetch(!refetch);
        }
      } else if (assigned && updated) {
        setLoading(true);
        const { data } = await axios.put("/admin/assign", {
          ...assign,
        });
        if (data.acknowledged) {
          setLoading(false);
          toast.success("Updated successfully", {
            toastId: "success",
          });
          setRefetch(!refetch);
        }
      }
      setRefetchComplain((prevState) => !prevState);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full rounded-lg bg-gray-100 max-w-sm ${
        drawer && "mx-auto"
      }`}
    >
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
      {/* {expand && ( */}
      <div className=" pb-8" hidden={!expand}>
        {assigned ? (
          <p className="text-center font-bold py-4">
            Assigned For Verification To:
          </p>
        ) : (
          <p className="text-center font-semibold py-4">Assign To:</p>
        )}
        <div className="mx-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
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
            </div>
          </form>
          {updated ? (
            <>
              <button
                className={
                  "w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center "
                }
                onClick={handleSubmit}
                disabled={loading}
              >
                {!loading ? <span>Save & Generate PDF</span> : <ButtonSpin />}
              </button>
            </>
          ) : (
            <PDFDownloadLink
              document={<PDFTemplate complain={complain} assign={assign} />}
              fileName="Assigned-for-verification"
            >
              {({ loading }) =>
                loading ? (
                  <button
                    className="w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center"
                    disabled
                  >
                    <ButtonSpin />
                  </button>
                ) : (
                  <button className="w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center">
                    Download PDF{" "}
                  </button>
                )
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default PendingApproval;
