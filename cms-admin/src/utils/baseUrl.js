import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

console.log("base url", localStorage.getItem("accessToken"));
// Alter defaults after instance has been created
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("accessToken")}`;

export default instance;
