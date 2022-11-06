import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Filter from "../components/Complains/Filter";
import Complain from "../components/Complains/Complain";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading";
import ButtonSpin from "../components/shared/ButtonSpin";
import { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const defaulValues = {
  ward: "",
  status: "",
  category: "",
};

let numOfdataToLoad = 3;
const Home = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState();
  const [totalComplains, setTotalComplains] = useState(0);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(false);
  const [render, setRender] = useState(false);

  // window.addEventListener("scroll", handleScroll);
  useEffect(() => {
    const getComplains = async () => {
      let CancelToken = axios.CancelToken;
      let cancel;
      try {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:5000/api/allcomplains",
          params: {
            filters: filteredData,
            page,
            count: numOfdataToLoad,
          },

          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          cancelToken: new CancelToken((c) => (cancel = c)),
        });
        setLoading(false);

        if (Object.keys(filteredData).length > 0) {
          setComplains(data);
        } else {
          setComplains((prevComplain) => {
            return [...prevComplain, ...data];
          });
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        setLoading(false);
        //toast.error("Something went wrong", { theme: "colored" });
      }
      return () => cancel();
    };
    getComplains();
  }, [filteredData, page, render]);
  // console.log("complains", complains);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/totalcomplains",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTotalComplains(data);
    })();
  });

  // if (loading) {
  //   return <Loading />;
  // }

  const handleChange = (e) => {
    setSelected(true);
    //if no option selected load all data
    if (e.target.value === "select") {
      delete filters[e.target.name];
      setFilters({ ...filters });
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setPage(0);
      setComplains([]);
      setLoading(true);
      setRender(!render);
      setFilteredData(filters);
    }
  };

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + numOfdataToLoad);
  };

  return (
    <div className="flex gap-x-10 md:justify-center items-center md:flex-row flex-col">
      <Filter handleChange={handleChange} handleSubmit={handleSubmit} />
      {loading ? (
        <ButtonSpin />
      ) : (
        !complains.length && (
          <p className="text-center font-semibold text-gray-500">
            No complains found!
          </p>
        )
      )}

      <div className="mt-20">
        <InfiniteScroll
          dataLength={complains?.length}
          next={fetchMoreData}
          hasMore={complains?.length !== totalComplains}
          loader=""
          style={{ overflow: "hidden" }}
        >
          {complains.map((complain) => (
            <Complain complain={complain} key={complain._id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
