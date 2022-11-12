const { ObjectId } = require("mongodb");
const { complainsCollection, votesCollection } = require("../model/Users");
const { citizensCollection } = require("../model/Users");

const findComplainByProperty = async (key, value) => {
  if (key === "_id") {
    return await citizensCollection.findOne({ [key]: ObjectId(value) });
  }

  return await citizensCollection.findOne({ [key]: value });
};

const getComplains = async ({ filters, page, count }) => {
  if (filters === undefined) {
    return await complainsCollection
      .find({ complainType: { $ne: "private" } })
      .sort({ _id: -1 })
      .skip(parseInt(page))
      .limit(parseInt(count))
      .toArray();
  }
  return await complainsCollection.find(filters).sort({ _id: -1 }).toArray();
};

const updateComplainsReactions = async (data) => {
  const filter = { _id: ObjectId(data.complain_id) };

  if (data.total_upvotes < 0) {
    data.total_upvotes = 0;
  }
  if (data.total_downvotes < 0) {
    data.total_downvotes = 0;
  }

  const update = {
    $set: { ...data },
  };

  return await complainsCollection.updateOne(filter, update);
};

const createNewComplain = async ({
  citizen_id,
  address,
  ward,
  description,
  attachment,
  complainType,
  category,
}) => {
  if (category) {
    const result = await complainsCollection.insertOne({
      citizen_id,
      address,
      ward,
      description,
      attachment,
      category,
      complainType,
      status: "pending approval",
      total_comments: 0,
      total_upvotes: 0,
      total_downvotes: 0,
      submission_date: new Date(),
    });

    // const complainsByUser = await complainsCollection.countDocuments({
    //   citizen_id,
    // });

    // await citizensCollection.updateOne(
    //   { _id: citizen_id },
    //   { $set: { total_complaints: complainsByUser } }
    // );

    return result;
  }
};

const findUserByComplain = async (uid) => {
  return await citizensCollection.findOne({ _id: ObjectId(uid) });
};

const findComplainsByUserId = (id) => {
  return complainsCollection
    .find({ citizen_id: ObjectId(id) })
    .sort({ _id: -1 })
    .toArray();
};

const deleteComplainById = (id) => {
  return complainsCollection.deleteOne({ _id: ObjectId(id) });
};

const getStatusCountByUser = async (id) => {
  let status = {};
  const pendingApproval = await complainsCollection.countDocuments({
    $and: [{ citizen_id: ObjectId(id) }, { status: "Pending approval" }],
  });
  const totalComplains = await complainsCollection.countDocuments({
    citizen_id: ObjectId(id),
  });
  return (status = { pendingApproval, totalComplains });
};

module.exports = {
  createNewComplain,
  findComplainByProperty,
  getComplains,
  updateComplainsReactions,
  findUserByComplain,
  findComplainsByUserId,
  deleteComplainById,
  getStatusCountByUser,
};
