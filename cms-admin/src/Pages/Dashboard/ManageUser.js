import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import DeleteUser from "../../components/Dashboard/ManageUser/DeleteUser";
import Row from "../../components/Dashboard/ManageUser/Row";
import Spin from "../../components/shared/Spin";

const ManageUser = () => {
  const [loading, setLoading] = useState(true);
  const [deleteUser, setDeleteUser] = useState(null);
  // const [users, setUsers] = useState([]);
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", async () => {
    try {
      const { data } = await axios.get("/admin/usersbyward");
      return data;
    } catch (error) {
      console.log(error);
      // <ServerError error={error}/>
    }
  });
  if (isLoading) {
    return <Spin />;
  }

  return (
    <section className="my-10 mx-10">
      <div className="bg-gray-100 rounded-lg p-2 w-fit mb-4 font-semibold">
        <p>Total Users: {users.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Complaints</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Delete</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <Row
                key={user._id}
                user={user}
                i={i}
                refetch={refetch}
                setDeleteUser={setDeleteUser}
              />
            ))}
          </tbody>
        </table>
      </div>
      {deleteUser && (
        <DeleteUser
          setDeleteUser={setDeleteUser}
          deleteUser={deleteUser}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default ManageUser;
