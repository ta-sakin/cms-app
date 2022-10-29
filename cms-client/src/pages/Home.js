import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaGalacticSenate, FaRegComment, FaUserCircle } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { useAuth } from "../context/AuthContext";
import wardsList from "../wardsList";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import useUser from "../hooks/useUser";
import { Tooltip } from "@mui/material";
import Loading from "../components/shared/Loading";

let commentsState = [];
const Home = () => {
  const { currentUser: user } = useAuth();
  const [complains, setComplains] = useState([]);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComment, setShowComment] = useState(true);
  const [commentClicked, setCommentClicked] = useState([]);
  const [userId] = useUser(user?.phoneNumber);
  const [commentId, setCommentId] = useState("");
  const [votes, setVotes] = useState([]);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const status = [
    "pending approval",
    "in verification",
    "in hold",
    "in progress",
    "rejected",
    "closed",
  ];

  useEffect(() => {
    const getComplains = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/allcomplains",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setComplains(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComplains();
  }, [upvote, downvote]);

  useEffect(() => {
    const userVotes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/votes/${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        data && setVotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    userVotes();
  }, [userId, upvote, downvote]);

  if (loading) {
    return <Loading />;
  }

  const handleUpvote = async (complainId, cid, complain) => {
    const voted = votes?.find((vote) => vote.complain_id === complainId);

    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/votes",
        {
          complain_id: complainId,
          citizen_id: userId,
          upvote: voted?.upvote ? !voted?.upvote : true,
          downvote: false,
          createdAt: new Date(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const response = await axios.put(
        `http://localhost:5000/api/complain`,
        {
          complain_id: complainId,
          total_upvotes: !voted?.upvote
            ? complain.total_upvotes + 1
            : complain.total_upvotes - 1,
          total_downvotes: voted?.downvote
            ? complain.total_downvotes - 1
            : complain.total_downvotes,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setUpvote(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = (complain_id, complain) => {};
  const handleDownvote = async (complainId, cid, complain) => {
    const voted = votes?.find((vote) => vote.complain_id === complainId);
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/votes",
        {
          complain_id: complainId,
          citizen_id: userId,
          upvote: false,
          downvote: voted?.downvote ? !voted?.downvote : true,
          createdAt: new Date(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const response = await axios.put(
        `http://localhost:5000/api/complain`,
        {
          complain_id: complainId,
          total_downvotes: !voted?.downvote
            ? complain.total_downvotes + 1
            : complain.total_downvotes - 1,
          total_upvotes: voted?.upvote
            ? complain.total_upvotes - 1
            : complain.total_upvotes,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setDownvote(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowComment = (complain, show) => {
    // setCommentId(complain._id);
    // // let copy = commentsState;
    // setCommentClicked([...commentClicked, { [complain._id]: showComment }]);
    // // console.log("commentsState", commentsState);

    // const clickedComment = commentClicked?.find(
    //   (comment) => comment[complain._id]
    // );

    setCommentClicked({
      [complain._id]: commentClicked[complain._id] ? false : true,
    });
    // let clickedComment;
    // if (commentClicked) {
    //   clickedComment = commentClicked?.find((comment) => comment[complain._id]);
    // }

    // setCommentClicked([
    //   ...commentClicked,
    //   {
    //     [complain._id]:
    //       clickedComment === undefined ? true : !clickedComment[complain._id],
    //   },
    // ]);

    console.log("commentClicked", commentClicked);
    // if (clickedComment === undefined) {
    //   setShowComment(true);
    // } else {
    //   setShowComment(!clickedComment[complain._id]);
    // }
  };

  return (
    <div className="flex gap-x-10 md:justify-center items-center md:flex-row flex-col">
      <div className="sm:w-96 md:sticky block md:self-start self-auto left-10 top-20 my-20 bg-white rounded-xl px-6 md:px-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
            <label htmlFor="ward">
              <select
                // value={ward}
                label="ward"
                onChange={handleChange}
                name="ward"
                required
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              >
                <option value="" selected disabled hidden>
                  Select a ward
                </option>
                {Object.keys(wardsList)?.map((key) => (
                  <option value={wardsList[key]}>{wardsList[key]}</option>
                ))}
              </select>
            </label>
            <label htmlFor="status">
              <select
                // value={ward}
                label="status"
                onChange={handleChange}
                name="status"
                required
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              >
                <option value="" selected disabled hidden>
                  Select complain status
                </option>
                {status?.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="category">
              <select
                // value={ward}
                label="category"
                onChange={handleChange}
                name="category"
                required
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              >
                <option value="" selected disabled hidden>
                  Select complain category
                </option>
                <option value="water">water</option>
              </select>
            </label>
            <button
              type="submit"
              id="sign-in-button"
              className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center uppercase"
            >
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
      <div className="mt-20">
        {[...complains]?.reverse().map((complain, key) => (
          <div className="sm:max-w-lg max-w-sm mb-10 bg-white rounded-xl border-2 py-6 px-4 mx-6 sm:mx-10">
            <div className="flex gap-2">
              <div>
                <FaUserCircle className="sm:text-4xl text-3xl text-gray-500" />
              </div>
              <div>
                <p className="text-sm">
                  {complain.complainType !== "public-anonymous"
                    ? user?.displayName
                    : "Anonymous"}
                </p>
                <p className="text-xs">
                  Ward: {complain.ward} | Status: {complain.status} | Category:
                  Water | Date: {complain.submission_date.split("T")[0]}
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
            <div className="">
              <div className="flex items-center gap-1 mt-4">
                <div className="bg-gray-100 h-10 flex items-center justify-center space-x-1  min-w-[60px] rounded-tl-2xl rounded-bl-2xl ">
                  <p className="text-sm flex items-center">
                    {complain.total_upvotes}
                  </p>
                  <Tooltip title="upvote" placement="top" arrow>
                    <div
                      className={`p-[2px] rounded-full hover:text-blue-500 cursor-pointer ${
                        votes?.some(
                          (vote) =>
                            vote.complain_id === complain._id && vote.upvote
                        ) && " bg-blue-500 hover:text-white text-white"
                      } `}
                      onClick={() =>
                        handleUpvote(
                          complain._id,
                          complain.citizen_id,
                          complain
                        )
                      }
                    >
                      <BiUpvote />
                    </div>
                  </Tooltip>
                </div>
                <div className="bg-gray-100 h-10 flex justify-center space-x-1 items-center min-w-[60px] rounded-tr-2xl rounded-br-2xl ">
                  <Tooltip title="downvote" placement="top" arrow>
                    <div
                      className={` p-[2px] rounded-full hover:text-blue-500 cursor-pointer ${
                        votes?.some(
                          (vote) =>
                            vote.complain_id === complain._id && vote.downvote
                        ) && " bg-blue-500 hover:text-white text-white"
                      } `}
                      onClick={() =>
                        handleDownvote(
                          complain._id,
                          complain.citizen_id,
                          complain
                        )
                      }
                    >
                      <BiDownvote />
                    </div>
                  </Tooltip>
                  <p className="text-sm flex items-center">
                    {complain.total_downvotes}
                  </p>
                </div>
                <Tooltip title="comment" placement="top" arrow>
                  <div
                    className="ml-5 text-2xl cursor-pointer hover:text-blue-500 hover:shadow-lg"
                    onClick={() => handleShowComment(complain)}
                  >
                    <FaRegComment className="font-thin" />
                  </div>
                </Tooltip>
              </div>
              <div
                className={`flex items-center mt-5 ${
                  commentClicked[complain._id] ? "block" : "hidden"
                }`}
              >
                <div>
                  <FaUserCircle className="sm:text-4xl text-3xl text-gray-500" />
                </div>
                <div className="w-full mx-2">
                  <label htmlFor="comment">
                    <input
                      onChange={handleChange}
                      id="comment"
                      name="comment"
                      type="comment"
                      autofocus="autofocus"
                      // value={email}
                      className="w-full text-sm py-2 border border-slate-200 rounded-2xl px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Enter your comment"
                    />
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    id="sign-in-button"
                    className="py-2 px-3 text-sm text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex items-center justify-center uppercase"
                  >
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
