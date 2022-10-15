const { MongoClient, ServerApiVersion } = require("mongodb");
function connectDB(uri) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  return client;
}
module.exports = connectDB;
