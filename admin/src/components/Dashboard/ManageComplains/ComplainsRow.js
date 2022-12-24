import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ComplainsRow = ({ complain, i }) => {
  const navigate = useNavigate();

  return (
    <tr key={complain._id} className="hover">
      <th>{i + 1}</th>

      <td>{moment(complain.submission_date).format("D MMM, YYYY")}</td>
      <td className="capitalize">{complain.category}</td>
      <td>
        {complain.complainType === "private" ? "N/A" : complain.total_upvotes}
      </td>
      <td>{complain.address}</td>
      {/* <td className="capitalize">{complain.status}</td> */}
      {/* {user.status === "active" ? (
        <td>
          <button className="btn btn-secondary btn-sm" onClick={handleStatus}>
            Block
          </button>
        </td>
      ) : (
        <td>
          <button className="btn btn-accent btn-sm" onClick={handleStatus}>
            Active
          </button>
        </td>
      )} */}
      {/* <td>
        <label htmlFor="my-modal-6" className="cursor-pointer">
          <MdDelete className="text-2xl" onClick={() => setDeleteUser(user)} />
        </label>
      </td> */}
      <td>
        <button
          className="btn btn-link"
          onClick={() => navigate(`/mcomplains/${complain._id}`)}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

export default ComplainsRow;
