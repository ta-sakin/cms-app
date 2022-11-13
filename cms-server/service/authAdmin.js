const { adminsCollection } = require("../model/Admin");

const postAdmin = async (data) => {
  return await adminsCollection.insertOne(data);
};

const findAdminByProperty = async (key, value) => {
  if (key === "_id") {
    return await adminsCollection.findOne({ [key]: ObjectId(value) });
  }

  return await adminsCollection.findOne({ [key]: value });
};

module.exports = { postAdmin, findAdminByProperty };
