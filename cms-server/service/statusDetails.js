const { ObjectId } = require("mongodb");
const { statusDetailsCollection } = require("../model/Admin");

const postStatusDetails = async (data) => {
  return await statusDetailsCollection.insertOne(data);
};

const findStatusDetails = async (id) => {
  return await statusDetailsCollection.findOne({ complain_id: id });
};
module.exports = { postStatusDetails, findStatusDetails };
