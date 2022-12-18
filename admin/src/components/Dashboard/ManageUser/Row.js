import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Row = ({ user, i, refetch, setDeleteUser }) => {
  const navigate = useNavigate();

  const handleStatus = async () => {
    try {
      const { data } = await axios.patch(`/admin/userstatus/${user._id}`, {
        status: user?.status === "active" ? "blocked" : "active",
      });
      if (data.acknowledged) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr key={user._id} className="hover">
      <th>{i + 1}</th>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.total_complaints}</td>
      <td className="capitalize">{user.status}</td>
      {user.status === "active" ? (
        <td>
          <button className="btn btn-secondary btn-sm bg-red-400 border-none" onClick={handleStatus}>
            Block
          </button>
        </td>
      ) : (
        <td>
          <button className="btn btn-accent btn-sm text-white" onClick={handleStatus}>
            Activate
          </button>
        </td>
      )}
      {/* <td>
        <label htmlFor="my-modal-6" className="cursor-pointer">
          <MdDelete className="text-2xl" onClick={() => setDeleteUser(user)} />
        </label>
      </td> */}
      <td>
        <button
          className="btn btn-link"
          onClick={() => navigate(`/muser/${user._id}`)}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

export default Row;
