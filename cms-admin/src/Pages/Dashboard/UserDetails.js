import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spin from "../../components/shared/Spin";
import axios from "axios";
import UserProfile from "../../components/Dashboard/ManageUser/UserProfile";
import Complains from "../../components/Dashboard/ManageUser/Complains";
import { useQuery } from "react-query";

const UserDetails = () => {
  const { id } = useParams();
  // const [details, setDetails] = useState({});
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(`admin/userdetails/${id}`);
  //       setDetails(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   })();
  // }, [id]);
  const {
    data: details,
    isLoading,
    refetch,
  } = useQuery("details", async () => {
    try {
      const { data } = await axios.get(`admin/userdetails/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  });
  if (isLoading) {
    return <Spin />;
  }
  return (
    <div>
      <UserProfile details={details} refetch={refetch} />
      <Complains details={details} />
    </div>
  );
};

export default UserDetails;
