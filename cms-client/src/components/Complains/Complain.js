import { Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { useAsyncError } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "./Comment";
import Votes from "./Votes";

const Complain = ({ complain }) => {
  const [name, setName] = useState("");
  const [totalComments, setTotalComments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(0);
  const [commentClicked, setCommentClicked] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/complain?uid=${complain.citizen_id}&cid=${complain._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setName(data[0]);
        setTotalComments(data[1]);
      } catch (error) {
        toast.error("Something went wrong", { theme: "colored" });
      }
    })();
  }, [complain.citizen_id, complain._id]);

  // const handleShowComment = async (complain) => {
  //   setLoading(true);
  //   setCommentClicked({
  //     [complain._id]: commentClicked[complain._id] ? false : true,
  //   });
  //   // setInputComment("");

  //   try {
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  return (
    <div className="sm:max-w-lg max-w-sm mb-10 bg-white rounded-xl border-2 py-6 px-4 mx-6 sm:mx-10">
      <div className="flex gap-2">
        <div>
          <FaUserCircle className="sm:text-4xl text-3xl text-gray-500" />
        </div>
        <div>
          <p className="text-sm">
            {complain.complainType !== "public-anonymous" ? name : "Anonymous"}
          </p>
          <p className="text-xs">
            Ward: {complain.ward} | Status: {complain.status} | Category:{" "}
            {complain.category}| Date: {complain.submission_date.split("T")[0]}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm mb-4">
          <span className="font-bold">Location:</span> {complain.address}
        </p>
        <p className="text-sm mb-5">{complain.description}</p>
        <div className="flex items-center gap-2">
          {complain.attachment.map((image) => (
            <div className="flex-1">
              <img className="w-fit" src={image.url} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1 mt-4">
          <Votes complain={complain} key={complain._id} />
          <Tooltip title="comment" placement="top" arrow>
            <div
              className="ml-5 text-2xl cursor-pointer hover:text-blue-500 flex gap-1 items-center"
              onClick={() => setCommentClicked(!commentClicked)}
            >
              <FaRegComment />
              <p className="text-sm">{totalComments}</p>
            </div>
          </Tooltip>
        </div>
        {commentClicked && (
          <Comment
            complain={complain}
            setTotalComments={setTotalComments}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Complain;
