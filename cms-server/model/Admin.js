const connectDB = require("../db");
const uri = require("../dbUri");
const client = connectDB(uri);
const adminsCollection = client.db("cms-admin").collection("admins");
module.exports = {
  adminsCollection,
};
