import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import ButtonSpin from "../../shared/ButtonSpin";
import HoldStatus from "./HoldStatus";
import PDFTemplate from "./PDFTemplate";
import ProgressStatus from "./ProgressStatus";
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

const Closed = ({ complain, drawer = false, setRefetchComplain }) => {
  const [expand, setExpand] = useState(true);
  const [loading, setLoading] = useState(false);
  const [assign, setAssign] = useState(defaultValue);
  const { remarks } = assign;
  const [assigned, setAssigned] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [assignedStatus, setAssignedStatus] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/admin/assign?cid=${complain._id}&status=closed`
        );

        if (Object.keys(data).length < 1) {
          setAssign(defaultValue);
          setUpdated(true);
          setLoading(false);
        } else if (data.status_type === "closed") {
          setUpdated(true);
          const response = await axios.get(`/admin/statusdate/${complain._id}`);
          if (response) {
            setAssignedStatus({ ...data, ...response.data });
          }
          setAssign(data);

          setLoading(false);
          setAssigned(true);
          setUpdated(false);
        } else {
          setLoading(false);
          setAssign(data);
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
      if(!remarks){
        toast.error("All fields are required", {
          toastId: "error",
        });
        return
      }
      if (assigned && updated) {
        setLoading(true);
        const { data } = await axios.put("/admin/assign", {
          ...assign,
        });
        if (data.acknowledged) {
          setLoading(false);
          toast.success("Complain updated successfully", {
            toastId: "success",
          });
          setRefetch(!refetch);
        }
        setRefetchComplain((prevState) => !prevState);
      }
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
          <div className="my-4">
            <ProgressStatus complain={complain} drawer={drawer} />
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
          <p className="text-white font-semibold py-2">Closing Details</p>
          <IoIosArrowForward
            className={`duration-200 text-white ${
              expand && "transition-transform mb-2 origin-left rotate-90"
            }`}
          />
        </div>

        <div className="pb-8" hidden={!expand}>
          <p className="mx-6 my-4">
            Closed on:{" "}
            {moment(assignedStatus["in closed start"]).format(
              "D MMM, YYYY hh:mm a"
            )}
          </p>
          <div className="mx-6 ">
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

export default Closed;
