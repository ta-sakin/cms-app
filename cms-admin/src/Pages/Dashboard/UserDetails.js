import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spin from "../../components/shared/Spin";
import axios from "axios";
import UserProfile from "../../components/Dashboard/ManageUser/UserProfile";
import Complains from "../../components/Dashboard/ManageUser/Complains";
import { useQuery, useQueryClient } from "react-query";

const UserDetails = () => {
  const { id } = useParams();
  // const [refetch, setRefetch] = useState(false);
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
  // }, [id, refetch]);

  const {
    data: details,
    isLoading,
    refetch,
    error,
  } = useQuery(["details", id], async () => {
    const { data } = await axios.get(`admin/userdetails/${id}`);
    return data;
  });
  if (isLoading) {
    return <Spin />;
  }

  // if (error) {
  //   console.log(error);
  // }
  return (
    <div>
      {details && <UserProfile details={details} refetch={refetch} />}
      {details && <Complains details={details} />}
    </div>
  );
};

export default UserDetails;
