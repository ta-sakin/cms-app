const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
app.use(xss());
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
