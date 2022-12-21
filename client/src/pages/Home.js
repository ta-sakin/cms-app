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
import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Skeleton,
} from "@mui/material";

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
          url: "http://localhost:5000/api/user/complain/all",
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
          if (sort) {
            const uniqueComplain = removeDuplicate(complains, data);
            sortBy(uniqueComplain, sort);
          } else {
            setComplains((prevComplain) => {
              //remove duplicate complain
              const uniqueComplain = removeDuplicate(prevComplain, data);
              return uniqueComplain;
            });
          }
        } else {
          if (sort) {
            const uniqueComplain = removeDuplicate(complains, data);

            sortBy(uniqueComplain, sort);
          } else {
            setComplains((prevComplain) => {
              //remove duplicate complain
              const uniqueComplain = removeDuplicate(prevComplain, data);
              return uniqueComplain;
            });
          }
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
  }, [filteredData, page, render]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/complain/total",
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
    sortBy(complains, value);
  };

  const removeDuplicate = (prevComplain, data) => {
    return _.uniqBy([...prevComplain, ...data], "_id");
  };

  //sort the complains by upvote or downvote
  const sortBy = (sortComplains, value) => {
    if (value === "upvote") {
      const sortByUpvote = sortComplains.sort(
        (upvote, downvote) => downvote.total_upvotes - upvote.total_upvotes
      );
      setComplains([...sortByUpvote]);
      console.log("complains upvote", sortByUpvote);
    } else if (value === "downvote") {
      const sortByDownvote = sortComplains.sort(
        (upvote, downvote) => downvote.total_downvotes - upvote.total_downvotes
      );
      setComplains([...sortByDownvote]);
      console.log("complains downvote", sortByDownvote);
    }
  };

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
            No complains found!
          </p>
        )
      )}
      <div className="mt-10">
        {!loading && (
          <div className="flex justify-end rounded-md">
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
