import { Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";

const Votes = ({ complain }) => {
  const { userId } = useAuth();
  const [refetch, setRefetch] = useState(false);
  const [votes, setVotes] = useState({});
  const [total, setTotal] = useState({});

  useEffect(() => {
    //if data is already fetched don't fetch again
    const CancelToken = axios.CancelToken;
    let cancel;

    const fetchData = async () => {
      try {
        const [totalVotes, userVotes] = await Promise.all([
          axios.get(
            `https://cms-server.cyclic.app/api/user/react/votes/total?cid=${complain._id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              cancelToken: new CancelToken((c) => {
                cancel = c;
              }),
            }
          ),
          axios.get(
            `https://cms-server.cyclic.app/api/user/react/votes?cid=${complain._id}&uid=${userId}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              cancelToken: new CancelToken((c) => {
                cancel = c;
              }),
            }
          ),
        ]);
        setTotal(totalVotes.data);
        setVotes(userVotes.data?.citizen_id && userVotes.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        }
      }
    };
    fetchData();
    return () => cancel();
  }, [userId, refetch, complain._id]);

  const handleUpvote = async (complainId, cid, complain) => {
    const { vote } = votes;
    setVotes({
      ...votes,
      vote: vote === "upvote" ? null : "upvote",
    });

    setTotal({
      totalUpvote:
        vote === "upvote" && total.totalUpvote > 0
          ? total.totalUpvote - 1
          : total.totalUpvote + 1,
      totalDownvote:
        vote === "downvote" && total.totalDownvote > 0
          ? total.totalDownvote - 1
          : total.totalDownvote < 0
          ? 0
          : total.totalDownvote,
    });
    //update votes on the backend
    try {
      //update active status
      const { data } = await axios.put(
        `https://cms-server.cyclic.app/api/user/react/votes`,
        {
          complain_id: complainId,
          citizen_id: userId,
          // upvote: votes?.upvote ? !votes?.upvote : true,
          // downvote: false,
          vote: vote === "upvote" ? null : "upvote",
          createdAt: new Date(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      //update total up and down vote
      const response = await axios.put(
        `https://cms-server.cyclic.app/api/user/complain`,
        {
          complain_id: complainId,
          total_upvotes:
            vote === "upvote" ? total.totalUpvote - 1 : total.totalUpvote + 1,
          total_downvotes:
            vote === "downvote" ? total.totalDownvote - 1 : total.totalDownvote,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (data && response) {
        setRefetch(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async (complainId, cid, complain) => {
    const { vote } = votes;
    setVotes({
      ...votes,
      vote: vote === "downvote" ? null : "downvote",
    });
    setTotal({
      totalDownvote:
        vote === "downvote" && total.totalDownvote > 0
          ? total.totalDownvote - 1
          : total.totalDownvote + 1,
      totalUpvote:
        vote === "upvote" && total.totalUpvote > 0
          ? total.totalUpvote - 1
          : total.totalUpvote < 0
          ? 0
          : total.totalUpvote,
    });
    //update votes on the backend
    try {
      //update active status
      const { data } = await axios.put(
        `https://cms-server.cyclic.app/api/user/react/votes`,
        {
          complain_id: complainId,
          citizen_id: userId,
          // upvote: false,
          // downvote: votes?.downvote ? !votes?.downvote : true,
          vote: votes.vote === "downvote" ? null : "downvote",
          createdAt: new Date(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      //update total up and down vote
      const response = await axios.put(
        `https://cms-server.cyclic.app/api/user/complain`,
        {
          complain_id: complainId,
          total_downvotes:
            vote === "downvote"
              ? total.totalDownvote - 1
              : total.totalDownvote + 1,
          total_upvotes:
            vote === "upvote" ? total.totalUpvote - 1 : total.totalUpvote,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (data && response) {
        setRefetch(data);
      }
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
        <Tooltip title="upvote" placement="top" arrow>
          <div
            className={`p-[2px] rounded-full hover:text-blue-500 cursor-pointer ${
              votes?.vote === "upvote"
                ? "bg-blue-500 hover:text-white text-white"
                : ""
            }`}
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
              votes.vote === "downvote"
                ? "bg-blue-500 hover:text-white text-white"
                : ""
            } `}
          >
            <BiDownvote />
          </div>
        </Tooltip>
        <p className="text-sm flex items-center">{total?.totalDownvote}</p>
      </div>
    </>
  );
};

export default Votes;
