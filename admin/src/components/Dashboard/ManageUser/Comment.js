import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import ButtonSpin from "../../shared/ButtonSpin";

const Comment = ({ complain }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/admin/comment/${complain._id}`);
        setComments(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [complain]);

  return (
    <div>
      {loading ? (
        <div className="mt-8 flex justify-center">
          <ButtonSpin />
        </div>
      ) : (
        <div className="mt-5">
          {comments?.map((comment, i) => (
            <div key={comment._id} className="mt-3 border-2 rounded-lg p-2">
              <div className="flex gap-2">
                <div>
                  <FaUserCircle className="sm:text-3xl text-2xl text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">{comment.name}</p>
                  <p className="text-xs">
                    Ward: {comment.ward} | {moment(comment.date).fromNow()}
                  </p>
                </div>
              </div>
              <p className="mt-3 ml-9 text-sm">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
