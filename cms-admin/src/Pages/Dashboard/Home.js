import axios from "axios";
import React, { useEffect, useState } from "react";
import Category from "../../components/Dashboard/HomeStats/Category";
import ComplainType from "../../components/Dashboard/HomeStats/ComplainType";
import Status from "../../components/Dashboard/HomeStats/Status";
import Summary from "../../components/Dashboard/HomeStats/Summary";
import ServerError from "../../components/shared/ServerError";
import Spin from "../../components/shared/Spin";

const Home = () => {
  const [count, setCount] = useState({
    users: 0,
    complains: 0,
    category: {},
    type: {},
    status: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/admin/datacount");
        if (data) {
          setCount({
            ...data,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        <ServerError error={error.response?.message} />;
      }
    })();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <section>
      <Summary count={count} />
      <Status count={count} />
      <Category categories={count?.category} />
      <ComplainType count={count} />
    </section>
  );
};

export default Home;
