import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../helper/constant";

const useToken = (phone) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(`${SERVER_URL}/api/user/auth/token`, {
          phone: phone,
        });
        setToken(data);
      } catch (error) {}
    })();
  }, [phone]);

  return [token];
};

export default useToken;
