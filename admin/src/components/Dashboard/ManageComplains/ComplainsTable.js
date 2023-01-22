import React, { useEffect, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Spin from "../../shared/Spin";
import ComplainsRow from "./ComplainsRow";

const ComplainsTable = ({ complains, privateComplain, loading }) => {
  const [sort, setSort] = useState(null);
  const [sortedComplains, setSortedComplains] = useState([]);

  useEffect(() => {
    if (sort === true) {
      const sorted = complains.sort((a, b) =>
        a.total_upvotes < b.total_upvotes
          ? 1
          : a.total_upvotes > b.total_upvotes
          ? -1
          : 0
      );
      //[...sorted] immediatedly replaces existing complains
      setSortedComplains([...sorted]);
    } else if (sort === false) {
      const sorted = complains.sort((a, b) =>
        a.total_upvotes > b.total_upvotes
          ? 1
          : a.total_upvotes < b.total_upvotes
          ? -1
          : 0
      );

      //[...sorted] immediatedly replaces existing complains
      setSortedComplains([...sorted]);
    } else {
      setSortedComplains(complains);
    }
  }, [sort, complains]);
  if (loading) {
    return <Spin />;
  }
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th></th>
          <th>Submission Date</th>
          <th>Status</th>
          <th>Category</th>
          {!privateComplain && (
            <th
              className="flex items-center cursor-pointer"
              onClick={() => setSort(sort === true ? false : true)}
            >
              Upvote
              <span className="text-gray-600">
                {
                  <>
                    <TiArrowSortedUp
                      className={`-mb-[5px] mt-[2px] ${
                        sort === true
                          ? "text-gray-700"
                          : sort === false
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    />
                    <TiArrowSortedDown
                      className={`-mt-[5px] ${
                        sort === false
                          ? "text-gray-700"
                          : sort === true
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    />
                  </>
                }
              </span>
            </th>
          )}
          <th>Location</th>
          <th>Actions</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {sortedComplains.map((complain, i) => (
          <ComplainsRow key={complain._id} complain={complain} i={i} />
        ))}
      </tbody>
    </table>
  );
};

export default ComplainsTable;
