import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PendingApproval from "../../components/Dashboard/ManageComplains/PendingApproval";
import Complain from "../../components/Dashboard/ManageUser/Complain";
import Spin from "../../components/shared/Spin";

const ComplainDetails = () => {
  const { id } = useParams();
  const [complain, setComplain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);
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

  return (
    <div className="flex gap-x-10 md:justify-center md:items-start items-center md:flex-row flex-col my-10">
      <div key={complain._id} className="sm:max-w-lg max-w-sm ">
        <Complain complain={complain[0]} details={complain[1]} manage={true} />
      </div>
      <PendingApproval complain={complain[0]} />
    </div>
  );
};

export default ComplainDetails;
