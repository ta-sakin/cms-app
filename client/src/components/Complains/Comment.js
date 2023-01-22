import { Tooltip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import useUser from "../../hooks/useUser";
import ButtonSpin from "../shared/ButtonSpin";

const Comment = ({ complain, setTotalComments }) => {
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState();
  const { currentUser: user } = useAuth();
  const [userId] = useUser(user?.phoneNumber);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);
        const { data } = await axios.get(
          `https://cms-server.cyclic.app/api/user/react/comment/${complain._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setComments(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [trigger, complain._id, loading]);

  const submitComment = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const { data } = await axios.post(
          `https://cms-server.cyclic.app/api/user/react/comment`,
          {
            complain_id: complain._id,
            citizen_id: userId,
            comment: inputComment,
            createdAt: new Date(),
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        data.acknowledged && setTotalComments(comments.length + 1);
        setTrigger(data);
        setInputComment("");
      } catch (error) {
        toast.error("Something went wrong", { theme: "colored" });
      }
    })();
  };

  return (
    <div>
      <div className="flex items-center mt-5">
        <div>
          <FaUserCircle className="sm:text-4xl text-3xl text-gray-500" />
        </div>
        <form onSubmit={submitComment} className="w-full">
          <div className="mx-2">
            <label htmlFor="comment">
              <input
                id="comment"
                name="comment"
                type="comment"
                autoFocus
                onChange={(e) => setInputComment(e.target.value)}
                value={inputComment}
                className="w-full text-sm py-2 border border-slate-200 rounded-2xl px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Write your comment..."
              />
            </label>
          </div>
        </form>
        <div>
          <button
            onClick={(e) => submitComment(e, complain._id)}
            type="submit"
            id="sign-in-button"
            className="py-2 sm:px-3 px-1 text-sm  text-white bg-black hover:bg-gray-900 rounded-full border-gray-900 hover:shadow inline-flex items-center justify-center"
          >
            <span>Comment</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="mt-8 flex justify-center">
          <ButtonSpin />
        </div>
      ) : (
        <div className="mt-5">
          {comments?.map((comment, i) => (
            <div className="mt-3 border-2 rounded-lg p-2">
              <div className="flex gap-2">
                <div>
                  <FaUserCircle className="sm:text-3xl text-2xl text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">{comment.name}</p>
                  <p className="text-xs">
                    {moment(comment.date).fromNow()} | Ward: {comment.ward}
                  </p>
                </div>
              </div>
              <p className="mt-2 ml-9 text-sm">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
