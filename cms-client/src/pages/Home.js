import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import wardsList from "../wardsList";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import useUser from "../hooks/useUser";
const Home = () => {
  const { currentUser: user } = useAuth();
  const [complains, setComplains] = useState([]);
  const [upvoteState, setUpvoteState] = useState({});
  const [userId] = useUser(user?.phoneNumber);
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
  }, []);

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
        setVotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    userVotes();
  }, [userId, upvoteState]);

  const handleUpvote = async (complainId, cid) => {
    const voted = votes?.find((vote) => vote.complain_id === complainId);
    setUpvoteState(voted);
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/votes",
        {
          complain_id: complainId,
          citizen_id: cid,
          upvote: voted?.upvote ? !voted?.upvote : true,
          downvote: voted?.downvote ? voted?.downvote : false,
          createdAt: new Date(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("data", data);
      // const response = await axios.put(
      //   `http://localhost:5000/api/${complainId}`,
      //   {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     },
      //   }
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-x-10 md:justify-center items-center md:flex-row flex-col">
      <div className="max-w-[380px] md:sticky block md:self-start self-auto left-10 top-20 my-20 bg-white rounded-xl px-6 md:px-10">
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
            {/* {!loading ? (
            <button
              type="submit"
              id="sign-in-button"
              className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center uppercase"
            >
              <span>Submit Complain</span>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-4 py-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center disabled"
              disabled
            >
              <ButtonSpin />
            </button>
          )} */}
          </div>
          {/* {error && <Error error={error} />} */}
        </form>
      </div>
      <div className="mt-20">
        {complains?.map((complain, key) => (
          <div className="sm:max-w-lg max-w-sm mb-10 bg-white rounded-xl border-2 py-6 px-4 mx-6 sm:mx-10">
            <div className="flex gap-2 ">
              <FaUserCircle className="text-4xl text-gray-500" />
              <div>
                <p className="text-sm">{user?.displayName}</p>
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
              <div className="flex gap-1 mt-4">
                <div
                  className="bg-gray-100 cursor-pointer h-10 flex items-center w-fit px-5 rounded-tl-2xl rounded-bl-2xl"
                  onClick={() =>
                    handleUpvote(complain._id, complain.citizen_id)
                  }
                >
                  <BiUpvote
                    className={`text-lg ${votes?.map(
                      (vote) =>
                        vote?.upvote &&
                        vote?.complain_id === complain?._id &&
                        "text-white bg-blue-500 font-bold rounded-full"
                    )}`}
                  />
                  <span></span>
                </div>
                <div className="bg-gray-100 cursor-pointer h-10 flex items-center w-fit px-5 rounded-tr-2xl rounded-br-2xl">
                  <BiDownvote className="text-lg" />
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
