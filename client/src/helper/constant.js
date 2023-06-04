export let SERVER_URL = "https://cms-server-production.up.railway.app";
const date = new Date();
if (date.getDate() > 20) {
  SERVER_URL = "https://cms-server-zf24.onrender.com";
}
