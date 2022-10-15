const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const uri = require("./dbUri");
const routes = require("./routes/index");
app.use(express.json());
app.use(cors());
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
    res.send("What are you doing in Citizen management system server!");
  });

  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
})();
