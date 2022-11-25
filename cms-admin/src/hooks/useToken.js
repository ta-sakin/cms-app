import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../firebase.init";

const useToken = () => {
  const [token, setToken] = useState("");
  const { currentUser: user } = useAuth();
  useEffect(() => {
    // const email = user?.user?.email;
    // const name = user?.user?.displayName;
    // const currentUser = { email, name };
    (async () => {
      try {
        if (user?.email) {
          const { data } = await axios.get(`/auth/token?email=${user.email}`);
          if (data) {
            console.log("usetoken", data);
            localStorage.setItem("accessToken", data.token);
            setToken(data.token);
          }
        }
      } catch (error) {
        throw error.message;
      }
    })();
  }, [user]);
  return [token];
};

export default useToken;
