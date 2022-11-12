const { adminsCollection } = require("../model/Admin");

const postAdmin = async (data) => {
  return await adminsCollection.insertOne(data);
};
module.exports = { postAdmin };
