import axios from "axios";
let SERVER_URL = "https://cms-server-production.up.railway.app/api";
const date = new Date();
if (date.getDate() > 20) {
  SERVER_URL = "https://cms-server-zf24.onrender.com/api";
}
const instance = axios.create({
  baseURL: SERVER_URL,
});

// Alter defaults after instance has been created
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("accessToken")}`;

export default instance;
