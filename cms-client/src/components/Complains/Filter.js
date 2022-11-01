import React from "react";
import wardsList from "../../wardsList";

const Filter = () => {
  const status = [
    "pending approval",
    "in verification",
    "in hold",
    "in progress",
    "rejected",
    "closed",
  ];
  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
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
  );
};

export default Filter;
