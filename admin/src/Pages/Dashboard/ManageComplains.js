import axios from "axios";
import React, { useEffect, useState } from "react";
import ComplainsTable from "../../components/Dashboard/ManageComplains/ComplainsTable";
import FilterStatus from "../../components/Dashboard/ManageComplains/Filter";
import Spin from "../../components/shared/Spin";

const ManageComplains = () => {
  const [filter, setFilter] = useState({ complainType: "public" });
  const [loading, setLoading] = useState(true);
  const [privateComplain, setPrivateComplain] = useState("");
  const [complains, setComplains] = useState([]);

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
      if (e.target.value === "Private") {
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
            No complaints found!
          </p>
        )
      )}
      <div className={`${!complains.length && "hidden"} `}>
        <div className="bg-gray-100 rounded-lg p-2 w-fit my-4 font-semibold">
          <p>Total Complains: {complains?.length || 0}</p>
        </div>
        <div className="overflow-x-auto">
          {complains.length && (
            <ComplainsTable
              loading={loading}
              complains={complains}
              privateComplain={privateComplain}
            />
          )}
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
