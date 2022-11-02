const { complainsCollection } = require("../model/Users");
const { citizensCollection } = require("../model/Users");

const findComplainByProperty = async (key, value) => {
  if (key === "_id") {
    return await citizensCollection.findOne({ [key]: ObjectId(value) });
  }

  return await citizensCollection.findOne({ [key]: value });
};

const createNewComplain = async ({
  citizen_id,
  address,
  ward,
  description,
  attachment,
  complainType,
}) => {
  return await complainsCollection.insertOne({
    citizen_id,
    address,
    ward,
    description,
    attachment,
    category: "",
    complainType,
    status: "pending approval",
    total_comments: 0,
    total_upvotes: 0,
    total_downvotes: 0,
    submission_date: new Date(),
  });
};
module.exports = { createNewComplain, findComplainByProperty };
