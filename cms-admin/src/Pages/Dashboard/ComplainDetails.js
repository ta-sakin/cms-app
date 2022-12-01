import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BackDrop from "../../components/Dashboard/Drawer/Backdrop";
import SlideDrawer from "../../components/Dashboard/Drawer/SlideDrawer";
import InVerification from "../../components/Dashboard/ManageComplains/InVerification";
// import InVerification from "../../components/Dashboard/ManageComplains/InVerification";
import PendingApproval from "../../components/Dashboard/ManageComplains/PendingApproval";
import Complain from "../../components/Dashboard/ManageUser/Complain";
import Spin from "../../components/shared/Spin";

const statusList = [
  "pending approval",
  "in verification",
  "in hold",
  "in hold",
  "in progress",
  "rejected",
  "closed",
];

const ComplainDetails = () => {
  const { id } = useParams();
  const [complain, setComplain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/admin/mcomplains/${id}`);
        setComplain(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleBackdropClick = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="my-10">
      <div className="flex justify-start mb-4">
        <SlideDrawer
          show={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          complain={complain[0]}
        />
        {drawerOpen && <BackDrop closeDrawer={handleBackdropClick} />}
        {complain[0].status !== "pending approval" && (
          <button
            onClick={handleOpenDrawer}
            className="border-[1px] border-black text-black py-1 px-2 rounded-lg font-semibold hover:bg-black hover:text-white"
          >
            Assigned History
          </button>
        )}
      </div>
      <div className="flex gap-x-10 md:justify-center md:items-start items-center md:flex-row flex-col">
        <div key={complain[0]._id} className="sm:max-w-lg max-w-sm ">
          <Complain
            complain={complain[0]}
            details={complain[1]}
            manage={true}
          />
        </div>
        {complain[0].status === "pending approval" && (
          <PendingApproval complain={complain[0]} />
        )}
        {complain[0].status?.toLowerCase() === "in verification" && (
          <InVerification complain={complain[0]} />
        )}
      </div>
    </div>
  );
};

export default ComplainDetails;
