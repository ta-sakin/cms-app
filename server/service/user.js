const { ObjectId } = require("mongodb");
const { citizensCollection } = require("../model/Users");

const findUserByProperty = async (key, value) => {
  if (key === "_id") {
    return await citizensCollection.findOne({ [key]: ObjectId(value) });
  }

  return await citizensCollection.findOne({ [key]: value });
};

const createNewUser = ({ name, email, phone, ward, address }) => {
  return citizensCollection.insertOne({
    name,
    email,
    phone,
    ward,
    address,
    total_complaints: 0,
    status: "active",
    createdAt: new Date(),
  });
};

const patchUser = async (id, data) => {
  return await citizensCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: data }
  );
};

const getUsersCount = async (ward) => {
  return await citizensCollection.countDocuments({ ward });
};
const getCitizensByWard = async (ward) => {
  return await citizensCollection.find({ ward }).sort({ _id: -1 }).toArray();
};

const updateUserStatus = async (id, status) => {
  return await citizensCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { status } }
  );
};

const deleteUserById = async (id) => {
  return await citizensCollection.deleteOne({ _id: ObjectId(id) });
};
module.exports = {
  findUserByProperty,
  createNewUser,
  patchUser,
  getUsersCount,
  getCitizensByWard,
  updateUserStatus,
  deleteUserById,
};
