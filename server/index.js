const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// const corsOptions = {
//   origin: "*",
//   // credentials: true, //access-control-allow-credentials:true
//   // optionSuccessStatus: 200,
// };
app.use(cors());
const connectDB = require("./db");
const uri = require("./dbUri");
const routes = require("./routes/index");
app.use(routes);

app.use((err, req, res, next) => {
  const message = err.message ? err.message : "Server error";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});

(async () => {
  const client = connectDB(uri);
  await client.connect();

  app.get("/", (req, res) => {
    res.send("What are you doing in the CMS server!");
  });

  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
})();
