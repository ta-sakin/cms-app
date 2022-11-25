import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import Comment from "./Comment";
import Votes from "./Votes";
import axios from "axios";
import { toast } from "react-toastify";

const Complain = ({ complain, details }) => {
  const [showComment, setShowComment] = useState(false);
  // const [totalComments, setTotalComments] = useState(0);
  const [total, setTotal] = useState({});

  useEffect(() => {
    const userVotes = async () => {
      try {
        const { data } = await axios.get(
          `admin/react/total?cid=${complain._id}`
        );
        setTotal(data);
      } catch (error) {
        toast.error("Something went wrong", { theme: "colored" });
      }
    };
    userVotes();
  }, [complain]);
  return (
    <>
      <div className=" mb-10 bg-white rounded-xl border-2 py-6 px-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              <FaUserCircle className="sm:text-4xl text-3xl text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-semibold">{details.name}</p>
              <p className="text-xs">
                <span>Ward: {complain.ward}</span> |{" "}
                <span className="capitalize">Status: {complain.status}</span> |{" "}
                <span className="capitalize">
                  Category:
                  {complain.category}
                </span>{" "}
                |{" "}
                <span>Date: {moment(complain.submission_date).fromNow()}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm mb-4">
            <span className="font-bold">Location:</span> {complain.address}
          </p>
          <p className="text-sm mb-5">{complain.description}</p>
          <div className="flex items-center gap-2">
            {complain.attachment.map((image, i) => (
              <div className="flex-1" key={i}>
                <img className="w-fit" src={image.url} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mt-4">
            <Votes key={complain._id} complain={complain} total={total.votes} />
            <div
              className="ml-5 text-2xl cursor-pointer hover:text-blue-500 flex gap-1 items-center"
              onClick={() => setShowComment(!showComment)}
            >
              <FaRegComment />
              <p className="text-sm">{total.comments}</p>
            </div>
          </div>
          {showComment && <Comment key={complain._id} complain={complain} />}
        </div>
      </div>
    </>
  );
};

export default Complain;
