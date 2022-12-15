import React from "react";

const statusList = [
  "Pending approval",
  "In verification",
  "In hold",
  "In progress",
  "Rejected",
  "Closed",
];

const complainType = ["Public", "Private"];
const FilterStatus = ({ handleChange }) => {
  return (
    <div className="w-full gap-2 flex">
      <label htmlFor="complainType">
        <select
          label="complainType"
          onChange={handleChange}
          name="complainType"
          defaultValue={"public"}
          className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
        >
          {/* <option value="select" disabled hidden>
            Filter By Complain Type
          </option> */}
          {/* <option value="select">All Complains</option> */}
          {complainType?.map((item, i) => (
            <option key={i} value={item}>
              {item} Complains
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="status">
        <select
          label="status"
          onChange={handleChange}
          name="status"
          defaultValue={"select"}
          className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
        >
          <option value="select" disabled hidden>
            Filter By Complain Status
          </option>
          <option value="select">All Complains</option>
          {statusList?.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FilterStatus;
