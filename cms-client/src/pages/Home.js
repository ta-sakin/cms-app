import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Filter from "../components/Complains/Filter";
import Complain from "../components/Complains/Complain";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading";

const Home = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getComplains = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/allcomplains",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setComplains(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong", { theme: "colored" });
      }
    };
    getComplains();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex gap-x-10 md:justify-center items-center md:flex-row flex-col">
      <Filter />
      <div className="mt-20">
        {complains.map((complain) => (
          <Complain complain={complain} key={complain._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
