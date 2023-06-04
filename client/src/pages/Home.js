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
import useUser from "../hooks/useUser";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SERVER_URL } from "../helper/constant";

const NUM_OF_DATA_TO_LOAD = 3;
const Home = () => {
  const { currentUser } = useAuth();
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState();
  const [totalComplains, setTotalComplains] = useState(0);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(false);
  const [render, setRender] = useState(false);
  const [sort, setSort] = useState("");
  const [userId] = useUser();

  useEffect(() => {
    //if data is already fetched don't fetch again
    let CancelToken = axios.CancelToken;
    let cancel;
    const getComplains = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${SERVER_URL}/api/user/complain/all`,
          params: {
            filters: filteredData,
            sort,
            page,
            count: NUM_OF_DATA_TO_LOAD,
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          cancelToken: new CancelToken((c) => (cancel = c)),
        });
        setLoading(false);
        //remove duplicate complain
        const uniqueComplain = removeDuplicate(complains, data);

        if (filteredData && Object.keys(filteredData).length > 0) {
          setComplains([...uniqueComplain]);
        } else {
          setComplains([...uniqueComplain]);
        }
        //if sort is selected then apply sort with filter
        if (sort) {
          sortBy(uniqueComplain, sort);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        setLoading(false);
        //toast.error("Something went wrong", { theme: "colored" });
      }
      return () => cancel();
    };
    getComplains();
    return () => cancel();
  }, [filteredData, page, render, sort]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${SERVER_URL}/api/user/complain/total`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTotalComplains(data);
    })();
  }, []);

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + NUM_OF_DATA_TO_LOAD);
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

  const handleChange = (e) => {
    setSelected(true);

    //if --select-- option selected load all data
    if (e.target.value === "select") {
      delete filters[e.target.name];
      setFilters({ ...filters });
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
    }
  };

  const handleSort = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  const removeDuplicate = (prevComplain, data) => {
    return _.uniqBy([...prevComplain, ...data], "_id");
  };

  //sort the complains by upvote or downvote
  const sortBy = (sortComplains, value) => {
    if (value === "upvote") {
      const sortByUpvote = sortComplains.sort(
        (first, second) => second.total_upvotes - first.total_upvotes
      );
      setComplains([...sortByUpvote]);
    } else if (value === "downvote") {
      const sortByDownvote = sortComplains.sort(
        (first, second) => second.total_downvotes - first.total_downvotes
      );
      setComplains([...sortByDownvote]);
    }
  };
  // if (!userId) {
  //   return (
  //     <div className="w-full mt-10 flex justify-center">
  //       <ButtonSpin />
  //     </div>
  //   );
  // }
  return (
    <div className="flex gap-x-10 md:justify-center items-center md:flex-row flex-col">
      <Filter handleChange={handleChange} handleSubmit={handleSubmit} />
      {loading ? (
        <div className="sm:w-96 w-fit flex justify-center">
          <ButtonSpin />
        </div>
      ) : (
        !complains.length && (
          <p className="text-center font-semibold text-gray-500">
            No complaints found!
          </p>
        )
      )}
      <div className={`mt-10 ${!complains.length ? "hidden" : ""}`}>
        {!loading && (
          <div className="flex justify-end rounded-md mr-1">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select" className="bg-white">
                Sort By
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Vote"
                value={sort}
                onChange={handleSort}
              >
                <MenuItem value="upvote">Upvote</MenuItem>
                <MenuItem value="downvote">Downvote</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        <InfiniteScroll
          dataLength={complains?.length}
          next={fetchMoreData}
          hasMore={complains?.length !== totalComplains}
          loader=""
          style={{ overflow: "hidden" }}
        >
          {complains?.map((complain) => (
            <Complain complain={complain} key={complain._id} userId={userId} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
