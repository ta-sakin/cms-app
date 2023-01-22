import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import ButtonSpin from "../../shared/ButtonSpin";
import HoldStatus from "./HoldStatus";
import PDFTemplate from "./PDFTemplate";
import VerificationCompleted from "./VerificationCompleted";
import VerificationStatus from "./VerificationStatus";

const statusList = ["closed"];

const defaultValue = {
  name: "",
  email: "",
  contact: "",
  designation: "",
  remarks: "",
};

const InProgress = ({ complain, drawer = false, setRefetchComplain }) => {
  const [expand, setExpand] = useState(true);
  const [loading, setLoading] = useState(false);
  const [assign, setAssign] = useState(defaultValue);
  const { remarks } = assign;
  const [assigned, setAssigned] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [closed, setClosed] = useState("");
  const [statusType, setStatusType] = useState("closed");
  const [assignedStatus, setAssignedStatus] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let status = "";
        if (complain?.status?.includes(" ")) {
          status = complain.status.split(" ")[1];
        } else {
          status = "closed";
        }
        const { data } = await axios.get(
          `/admin/assign?cid=${complain._id}&status=${status}`
        );

        if (Object.keys(data).length < 1) {
          setAssign(defaultValue);
          setUpdated(true);
          setLoading(false);
        } else if (data.status_type === "progress") {
          setAssign(defaultValue);
          setUpdated(true);
          // setAssignedStatus(data);
          const response = await axios.get(`/admin/statusdate/${complain._id}`);
          if (response) {
            setAssignedStatus({ ...data, ...response.data });
          }
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

  const handleSelectStatus = (e) => {
    setUpdated(true);
    setStatusType("closed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if(!remarks){
      //   toast.error("All fields are required", {
      //     toastId: "error",
      //   });
      //   return
      // }
      if (!assigned) {
        setLoading(true);
        const { data } = await axios.post("/admin/assign", {
          complain_id: complain._id,
          status_type: statusType,
          date_status_start: "in " + statusType + " start",
          date_status_end: "in progress end",
          complain_status: statusType,
          ...assign,
        });
        if (data.acknowledged) {
          setLoading(false);
          setAssign(defaultValue);
          toast.success("Complain closed successfully", {
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
      // window.location.reload()
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={`w-full max-w-sm ${drawer && "mx-auto"}`}>
      {!drawer && (
        <>
          <div className="mb-4">
            <VerificationStatus complain={complain} drawer={true} />
          </div>
          <div className="my-4">
            <HoldStatus complain={complain} drawer={true} />
          </div>
        </>
      )}
      <div
        className={`w-full rounded-lg bg-gray-100 max-w-sm ${
          drawer && "mx-auto"
        }`}
      >
        <div
          className="cursor-pointer bg-gray-500 px-4 hover:bg-gray-600 flex justify-between items-center rounded-lg h-fit"
          onClick={() => setExpand(!expand)}
        >
          <p className="text-white font-semibold py-2">In Progress Details </p>
          <IoIosArrowForward
            className={`duration-200 text-white ${
              expand && "transition-transform mb-2 origin-left rotate-90"
            }`}
          />
        </div>
        <div className="pb-8" hidden={!expand}>
          {drawer && (
            <di className="flex justify-center pt-4">
              <p className="capitalize bg-gray-200 font-semibold w-fit rounded-lg p-1">
                Status: {complain.status}
              </p>
            </di>
          )}
          <div className="py-4 px-3">
            <p>
              <span className="font-semibold">In progress since: </span>
              {moment(assignedStatus["in progress start"]).format(
                "D MMM, YYYY hh:mm a"
              )}
            </p>
            <p className="font-bold py-2">Assigned To:</p>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {assignedStatus?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {assignedStatus?.email}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {assignedStatus?.contact}
            </p>
            <p>
              <span className="font-semibold">Designation:</span>{" "}
              {assignedStatus?.designation}
            </p>
            <p className="pt-2">
              <span className="font-bold">Admin Remarks:</span>{" "}
              {assignedStatus?.remarks}
            </p>
            <div className="border-b-2 pt-4"></div>
          </div>
          <div
            className={`flex justify-center items-center gap-2 mx-3 pt-4 ${
              drawer && "hidden"
            }`}
          >
            <p>Change status: </p>
            <label htmlFor="status">
              <select
                label="status"
                onChange={handleSelectStatus}
                name="status"
                defaultValue={"closed"}
                className="w-full text-sm py-1 border border-slate-200 rounded-lg px-3 focus:outline-none capitalize focus:border-slate-500 hover:shadow"
              >
                {statusList?.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {assigned ? (
            <p className="text-center font-bold py-4">
              Complain Status Details
            </p>
          ) : (
            <p className="text-center font-semibold py-4">Assign To:</p>
          )}
          <div className="mx-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-5">
                <label htmlFor="remarks">
                  <p className="text-sm text-slate-700 pb-1">Admin Remarks</p>
                  <textarea
                    onChange={handleChange}
                    id="remarks"
                    name="remarks"
                    type="remarks"
                    value={remarks}
                  required
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
                      className="w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2       items-center justify-center"
                      disabled
                    >
                      <ButtonSpin />
                    </button>
                  ) : (
                    <button className="w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center">
                      Download PDF
                    </button>
                  )
                }
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InProgress;
