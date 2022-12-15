import axios from "axios";
import React, { useEffect, useState } from "react";
import Spin from "../../shared/Spin";
import UnauthError from "../../shared/UnauthError";
import Complain from "./Complain";

const Complains = ({ details }) => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleShowComplains = async () => {
    setShow((prevState) => !prevState);
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/admin/complains/${details._id}`);
        setLoading(false);
        setComplains(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
        // <UnauthError error={error} />;
      }
    })();
  }, [details]);

  return (
    <>
      <div>
        <p
          className="cursor-pointer text-center bg-gray-500 text-white font-semibold py-2 rounded-lg mx-4 hover:bg-gray-600 mb-10"
          onClick={handleShowComplains}
        >
          View All Complains ({complains.length})
        </p>
      </div>
      <div className={`${!show && "hidden"}`}>
        {loading ? (
          <Spin />
        ) : (
          complains?.map((complain) => (
            <div key={complain._id} className="mx-auto sm:max-w-lg max-w-sm">
              <Complain complain={complain} details={details} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Complains;
