import axios from "axios";
import React from "react";
import ReactDom from "react-dom";

const DeleteUser = ({ refetch, setDeleteUser, deleteUser }) => {
  const { _id } = deleteUser;
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`admin/deleteuser/${_id}`);
      if (data.acknowledged) {
        refetch();
        setDeleteUser(null);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return ReactDom.createPortal(
    <>
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle z-[1000]"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Are you sure you want to delete the user?
          </h3>
          <div className="modal-action flex justify-center">
            <button
              onClick={handleDelete}
              className="btn btn-outline btn-sm w-20"
            >
              Yes
            </button>
            <label htmlFor="my-modal-6" className="btn btn-sm w-20">
              <button
                onClick={() => setDeleteUser(null)}
                className="btn btn-accent btn-sm w-20"
              >
                No
              </button>
            </label>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DeleteUser;
