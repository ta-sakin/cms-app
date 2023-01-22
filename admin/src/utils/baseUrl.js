import axios from "axios";

const instance = axios.create({
  baseURL: `https://cms-server.cyclic.app/api`,
});

// Alter defaults after instance has been created
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("accessToken")}`;

export default instance;
