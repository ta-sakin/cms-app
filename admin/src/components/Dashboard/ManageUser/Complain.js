import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import Comment from "./Comment";
import Votes from "./Votes";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const Complain = ({ complain, details, manage = false }) => {
  const [showComment, setShowComment] = useState(false);
  // const [totalComments, setTotalComments] = useState(0);
  const [expand, setExpand] = useState(false);
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
  // const userVotes = async () => {
  //   try {
  //     const { data } = await axios.get(`admin/react/total?cid=${complain._id}`);
  //     return data;
  //   } catch (error) {
  //     toast.error("Something went wrong", { theme: "colored" });
  //   }
  // };

  // const { data: total } = useQuery("complain", userVotes);
  const seeMore = () => {
    setExpand(true);
  };

  return (
    <>
      <div className="mb-10 bg-white rounded-xl border-2 py-4 px-4">
        <div className="">
          <div className="flex gap-2 items-center">
            <div>
              {manage ? (
                <Link to={`/muser/${complain.citizen_id}`}>
                  <FaUserCircle className="sm:text-4xl text-3xl text-gray-500 hover:text-blue-500 hover:ring-offset-1 hover:ring-1 rounded-full" />
                </Link>
              ) : (
                <FaUserCircle className="sm:text-4xl text-3xl text-gray-500" />
              )}
            </div>
            <div>
              {manage ? (
                <Link to={`/muser/${complain.citizen_id}`}>
                  <span className="text-sm font-semibold link-hover hover:text-blue-500">
                    {details.name}
                  </span>
                </Link>
              ) : (
                <span className="text-sm font-semibold">{details.name}</span>
              )}
              <p className="text-sm">
                <strong>Submission Date: </strong>
                <span>
                  {moment(complain.submission_date).format(
                    "D MMM, YYYY hh:mm a"
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm">
              <strong>Ward: </strong>
              <span>{complain.ward}</span>
            </p>
            <p className="text-sm">
              <strong>Complain Type: </strong>
              <span className="capitalize">
                {complain.complainType.includes("-")
                  ? "Public (anonymously posted)"
                  : complain.complainType}{" "}
              </span>
            </p>
            <p className="text-sm">
              <strong>Status: </strong>
              <span className="capitalize">{complain.status} </span>
            </p>
            <p className="text-sm">
              <strong>Category: </strong>
              <span className="capitalize"> {complain.category}</span>
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm mb-4">
            <span className="font-bold">Location:</span> {complain.address}
          </p>
          <p className="text-sm mb-5">
            {complain.description.length > 100 ? (
              <span>
                {!expand && (
                  <span>
                    {complain.description.slice(0, 100)}{" "}
                    <span
                      className="font-bold hover:underline"
                      onClick={seeMore}
                    >
                      See more...
                    </span>
                  </span>
                )}
              </span>
            ) : (
              <span>{complain.description}</span>
            )}
          </p>
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
            {complain.complainType === "private" ? (
              <div></div>
            ) : (
              <Votes
                key={complain._id}
                complain={complain}
                total={total?.votes}
              />
            )}
            <div
              className={"ml-5 text-2xl cursor-pointer hover:text-blue-500 flex gap-1 items-center "`${
                complain.complainType === "private" && "hidden"
              }`}
              onClick={() => total.comments && setShowComment(!showComment)}
            >
              <FaRegComment />
              <p className="text-sm">{total?.comments}</p>
            </div>
            {!manage && (
              <div className="w-full flex justify-end">
                <Link to={`/mcomplains/${complain._id}`}>
                  <button className="btn btn-accent btn-sm text-white">
                    Manage
                  </button>
                </Link>
              </div>
            )}
          </div>
          {showComment && complain.complainType === "private" ? (
            <div></div>
          ) : (
            <Comment key={complain._id} complain={complain} />
          )}
        </div>
      </div>
    </>
  );
};

export default Complain;
