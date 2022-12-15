import { Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import useUser from "../../hooks/useUser";
import Loading from "../shared/Loading";

const Votes = ({ complain }) => {
  const { currentUser: user } = useAuth();
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId] = useUser(user?.phoneNumber);
  const [votes, setVotes] = useState({});
  const [total, setTotal] = useState({});

  useEffect(() => {
    const userVotes = async () => {
      try {
        const { data } = await axios.get(
          `https://cms-server-production.up.railway.app/api/user/react/votes/total?cid=${complain._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setTotal(data);
      } catch (error) {
        toast.error("Something went wrong", { theme: "colored" });
      }
    };
    userVotes();
  }, [userId, upvote, downvote, complain._id]);

  useEffect(() => {
    const userVotes = async () => {
      try {
        const { data } = await axios.get(
          `https://cms-server-production.up.railway.app/api/user/react/votes?cid=${complain._id}&uid=${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setVotes(data?.citizen_id && data);
      } catch (error) {
        toast.error("Something went wrong", { theme: "colored" });
      }
    };
    userVotes();
  }, [userId, upvote, downvote, complain._id]);

  const handleUpvote = async (complainId, cid, complain) => {
    try {
      const { data } = await axios.put(
        "https://cms-server-production.up.railway.app/api/user/react/votes",
        {
          complain_id: complainId,
          citizen_id: userId,
          vote: 1,
          createdAt: new Date(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUpvote(data);

      const response = await axios.put(
        `https://cms-server-production.up.railway.app/api/user/complain`,
        {
          complain_id: complainId,
          total_upvotes: !votes?.upvote
            ? complain.total_upvotes + 1
            : complain.total_upvotes - 1,
          total_downvotes: votes?.downvote
            ? complain.total_downvotes - 1
            : complain.total_downvotes,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async (complainId, cid, complain) => {
    try {
      const { data } = await axios.put(
        "https://cms-server-production.up.railway.app/api/user/react/votes",
        {
          complain_id: complainId,
          citizen_id: userId,
          vote: -1,
          createdAt: new Date(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setDownvote(data);
      const response = await axios.put(
        `https://cms-server-production.up.railway.app/api/user/complain`,
        {
          complain_id: complainId,
          total_downvotes: !votes?.downvote
            ? complain.total_downvotes + 1
            : complain.total_downvotes - 1,
          total_upvotes: votes?.upvote
            ? complain.total_upvotes - 1
            : complain.total_upvotes,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="bg-gray-100 hover:bg-blue-100 cursor-pointer h-10 flex items-center justify-center space-x-1 min-w-[60px] rounded-tl-2xl rounded-bl-2xl"
        onClick={() =>
          handleUpvote(complain._id, complain.citizen_id, complain)
        }
      >
        <p className="text-sm flex items-center">{total?.totalUpvote}</p>
        {/* <p className="text-sm flex items-center">{complain?.total_downvotes}</p> */}
        <Tooltip title="upvote" placement="top" arrow>
          <div
            className={`p-[2px] rounded-full hover:text-blue-500 cursor-pointer ${
              votes?.upvote &&
              // complain.citizen_id === votes?.citizen_id &&
              "bg-blue-500 hover:text-white text-white"
            } `}
          >
            <BiUpvote />
          </div>
        </Tooltip>
      </div>
      <div
        className="bg-gray-100 hover:bg-blue-100 cursor-pointer h-10 flex justify-center space-x-1 items-center min-w-[60px] rounded-tr-2xl rounded-br-2xl"
        onClick={() =>
          handleDownvote(complain._id, complain.citizen_id, complain)
        }
      >
        <Tooltip title="downvote" placement="top" arrow>
          <div
            className={` p-[2px] rounded-full hover:text-blue-500 cursor-pointer ${
              votes.downvote && " bg-blue-500 hover:text-white text-white"
            } `}
          >
            <BiDownvote />
          </div>
        </Tooltip>
        <p className="text-sm flex items-center">{total?.totalDownvote}</p>
        {/* <p className="text-sm flex items-center">{complain?.total_downvotes}</p> */}
      </div>
    </>
  );
};

export default Votes;
