import axios from "axios";
import React, { useEffect, useState } from "react";

const useToken = (phone) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "https://cms-server-production.up.railway.app/api/user/auth/token",
          {
            phone: phone,
          }
        );
        setToken(data);
      } catch (error) {}
    })();
  }, [phone]);

  return [token];
};

export default useToken;
