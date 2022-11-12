import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Filter from "../components/Complains/Filter";
import Complain from "../components/Complains/Complain";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading";
import ButtonSpin from "../components/shared/ButtonSpin";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";

const NUM_OF_DATA_TO_LOAD = 3;
const Home = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState();
  const [totalComplains, setTotalComplains] = useState(0);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const getComplains = async () => {
      let CancelToken = axios.CancelToken;
      let cancel;
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://cms-server-production.up.railway.app/api/allcomplains",
          params: {
            filters: filteredData,
            page,
            count: NUM_OF_DATA_TO_LOAD,
          },

          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          cancelToken: new CancelToken((c) => (cancel = c)),
        });

        setLoading(false);
        if (filteredData && Object.keys(filteredData).length > 0) {
          setComplains(data);
        } else {
          setComplains((prevComplain) => {
            const uniqueComplain = _.uniq([...prevComplain, ...data]);
            return uniqueComplain;
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

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://cms-server-production.up.railway.app/api/totalcomplains",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTotalComplains(data);
    })();
  });

  const handleChange = (e) => {
    setSelected(true);

    //if no --select-- option selected load all data
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
      setPage(0); //render all data again [pagination for the backend]
      setComplains([]); //empty the prev data
      setLoading(true);
      setRender(!render); //trigger useeffect
      setFilteredData(filters);
    }
  };

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + NUM_OF_DATA_TO_LOAD);
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
          {complains?.map((complain) => (
            <Complain complain={complain} key={complain._id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
