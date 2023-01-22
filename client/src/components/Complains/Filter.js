import React from "react";
import wardsList from "../../wardsList";

const Filter = ({ handleChange, handleSubmit }) => {
  const statusList = [
    "Pending approval",
    "In verification",
    "In hold",
    "In progress",
    "Rejected",
    "Closed",
  ];

  // const categories = ["Water", "Mosquitos", "Roads", "Others"];
  const categories = [
    "water",
    "mosquitos",
    "roads",
    "wastes",
    "illegal_construction",
    "noise_pollution",
    "air_pollution",
    "public_sanitation",
    "others",
  ];

  return (
    <div className="sm:w-96 md:sticky block md:self-start self-auto left-10 top-20 mt-10 md:mt-24 bg-white rounded-xl px-6 md:px-10">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="ward">
            <select
              label="ward"
              onChange={handleChange}
              name="ward"
              className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            >
              <option defaultValue="" selected disabled hidden>
                Select a ward
              </option>
              <option value="select">All</option>

              {Object.keys(wardsList)?.map((key, i) => (
                <option key={i} value={wardsList[key]}>
                  {wardsList[key]}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="status">
            <select
              label="status"
              onChange={handleChange}
              name="status"
              className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            >
              <option defaultValue="" selected disabled hidden>
                Select complaint status
              </option>
              <option value="select">All</option>

              {statusList?.map((item, i) => (
                <option key={i} value={item}>
                  {item.includes("_") ? item.split("_").join(" ") : item}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="category">
            <select
              label="category"
              onChange={handleChange}
              name="category"
              className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            >
              <option defaultValue="" selected disabled hidden>
                Select complaint category
              </option>
              <option value="select">All</option>

              {categories?.map((category, i) => (
                <option key={i} value={category} className="capitalize">
                  {category.includes("_")
                    ? category.split("_").join(" ")
                    : category}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            id="sign-in-button"
            className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center cursor-pointer"
          >
            <span>Apply Filters</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
