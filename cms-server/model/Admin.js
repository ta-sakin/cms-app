const connectDB = require("../db");
const uri = require("../dbUri");
const client = connectDB(uri);
const adminsCollection = client.db("cms-admin").collection("admins");
const statusDetailsCollection = client
  .db("cms-admin")
  .collection("status_details");
module.exports = {
  adminsCollection,
  statusDetailsCollection,
};
