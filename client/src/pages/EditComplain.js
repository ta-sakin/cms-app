import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
const classifiedCategories = [
  "roads",
  "wastes",
  "mosquitos",
  "water",
  "illegal_construction",
  "noise_pollution",
  "air_pollution",
  "public_sanitation",
  "others",
];

const EditComplain = ({ setEdit, edit }) => {
  const [category, setCategory] = useState(edit?.category);
  const handleEdit = async () => {
    if (category === edit.category) {
      return;
    }
    const { data } = await axios.patch(
      `https://cms-server.cyclic.app/api/user/complain/${edit._id}`,
      { category },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (data) {
      toast.success("Category edited", { toastId: "success" });
      setEdit("");
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return ReactDom.createPortal(
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle " />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="text-center font-semibold flex mx-10 justify-center items-center">
            <p className="mr-2">Change Category:</p>
            <label htmlFor="category">
              <select
                label="category"
                onChange={handleChange}
                name="category"
                defaultValue={edit?.category}
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow capitalize"
              >
                {classifiedCategories?.map((item, i) => (
                  <option key={i} value={item} className="capitalize">
                    {item.includes("_") ? item.split("_").join(" ") : item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="modal-action flex justify-center">
            <button
              onClick={handleEdit}
              className="btn btn-outline btn-sm w-20"
            >
              Save
            </button>
            <label htmlFor="my-modal-6" className="btn btn-sm w-20">
              <button
                onClick={() => setEdit(null)}
                className="btn btn-accent btn-sm w-20"
              >
                Cancel
              </button>
            </label>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditComplain;
