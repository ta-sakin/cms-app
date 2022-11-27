const { ObjectId } = require("mongodb");
const { statusDetailsCollection } = require("../model/Admin");

const postStatusDetails = async (data) => {
  return await statusDetailsCollection.insertOne(data);
};

const findStatusDetails = async (id) => {
  return await statusDetailsCollection.findOne({ complain_id: id });
};

const putAssignedComplain = async (data) => {
  const { _id, ...rest } = data;
  return await statusDetailsCollection.updateOne(
    { _id: ObjectId(_id) },
    { $set: rest }
  );
};

module.exports = { postStatusDetails, findStatusDetails, putAssignedComplain };
