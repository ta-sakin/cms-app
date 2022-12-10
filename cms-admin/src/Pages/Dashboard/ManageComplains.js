import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ComplainsRow from "../../components/Dashboard/ManageComplains/ComplainsRow";
import FilterStatus from "../../components/Dashboard/ManageComplains/Filter";
import Filter from "../../components/Dashboard/ManageComplains/Filter";
import Spin from "../../components/shared/Spin";

const ManageComplains = () => {
  const [filter, setFilter] = useState({});
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [privateComplain, setPrivateComplain] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/admin/mcomplains", {
          params: {
            filter,
          },
        });
        setComplains(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        // <ServerError error={error}/>
      }
    })();
  }, [filter]);

  const handleFilter = (e) => {
    //if all complains option selected load all data
    if (e.target.value === "select") {
      delete filter[e.target.name];
      setFilter({ ...filter });
    } else {
      if (e.target.value === "private") {
        setPrivateComplain("private");
      } else {
        setPrivateComplain("");
      }
      setFilter({ ...filter, [e.target.name]: e.target.value.toLowerCase() });
    }
  };

  return (
    <section className="my-10 mx-10">
      <div className="mb-4">
        <FilterStatus handleChange={handleFilter} />
      </div>
      <hr />
      {loading ? (
        <Spin />
      ) : (
        !complains.length && (
          <p className="text-center mt-10 font-semibold text-gray-500">
            No complains found!
          </p>
        )
      )}
      <div className={`${!complains.length && "hidden"} `}>
        <div className="bg-gray-100 rounded-lg p-2 w-fit my-4 font-semibold">
          <p>Total Complains: {complains?.length || 0}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Submission Date</th>
                <th>Category</th>
                <th className={`${privateComplain === "private" && "hidden"}`}>
                  Upvote
                </th>
                <th>Location</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {complains.map((complain, i) => (
                <ComplainsRow
                  key={complain._id}
                  complain={complain}
                  i={i}
                  // refetch={refetch}
                  // setDeleteUser={setDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* {deleteUser && (
        <DeleteUser
          setDeleteUser={setDeleteUser}
          deleteUser={deleteUser}
          refetch={refetch}
        />
      )} */}
      </div>
    </section>
  );
};

export default ManageComplains;
