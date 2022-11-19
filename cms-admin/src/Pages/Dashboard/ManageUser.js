import axios from "axios";
import React, { useEffect, useState } from "react";
import Spin from "../../components/shared/Spin";

const ManageUser = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/admin/usersbyward");
        if (data) {
          setUsers(data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        // <ServerError error={error}/>
      }
    })();
  }, []);
  if (loading) {
    return <Spin />;
  }
  return (
    <section className="my-10 mx-10">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Complaints</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id} className="hover">
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>Blue</td>
                <td>{user.status}</td>
                <td>
                  <button className="btn btn-warning">Active</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUser;
