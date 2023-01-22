const { ObjectId } = require("mongodb");
const { datesCollection } = require("../model/Admin");
const { complainsCollection, votesCollection } = require("../model/Users");
const { citizensCollection } = require("../model/Users");

const findComplainByProperty = async (key, value) => {
  if (key === "_id") {
    return await complainsCollection.findOne({ [key]: ObjectId(value) });
  }

  return await citizensCollection.findOne({ [key]: value });
};

const getComplains = async ({ filters, page, count, sort }) => {
  const allFilters = { $and: [{ complainType: { $ne: "private" } }, filters] };
  //without filter
  if (filters === undefined) {
    if (sort) {
      if (sort === "upvote") {
        return await complainsCollection
          .find({ complainType: { $ne: "private" } })
          .sort({ total_upvotes: -1 })
          .skip(parseInt(page))
          .limit(parseInt(count))
          .toArray();
      } else if (sort === "downvote") {
        return await complainsCollection
          .find({ complainType: { $ne: "private" } })
          .sort({ total_downvotes: -1 })
          .skip(parseInt(page))
          .limit(parseInt(count))
          .toArray();
      }
    }
    //without sort
    return await complainsCollection
      .find({ complainType: { $ne: "private" } })
      .sort({ submission_date: -1 })
      .skip(parseInt(page))
      .limit(parseInt(count))
      .toArray();
  }

  //with filter and sort
  if (sort) {
    if (sort === "upvote") {
      return await complainsCollection
        .find(allFilters)
        .sort({ total_upvotes: -1 })
        .toArray();
    }
    if (sort === "upvote") {
      return await complainsCollection
        .find(allFilters)
        .sort({ total_upvotes: -1 })
        .toArray();
    }
  }
  //without sort
  return await complainsCollection
    .find(allFilters)
    .sort({ submission_date: -1 })
    .toArray();
};

const updateComplainsReactions = async (data) => {
  const filter = { _id: ObjectId(data.complain_id) };
  let updateData = { ...data };
  if (data.total_upvotes < 0) {
    updateData = {
      ...data,
      total_upvotes: 0,
    };
  }
  if (data.total_downvotes < 0) {
    updateData = {
      ...data,
      total_downvotes: 0,
    };
  }
  const update = {
    $set: updateData,
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

    const countOfComplains = await complainsCollection.countDocuments({
      citizen_id,
    });

    await citizensCollection.updateOne(
      { _id: citizen_id },
      { $set: { total_complaints: countOfComplains } }
    );

    await datesCollection.insertOne({
      complain_id: result.insertedId.toString(),
      submission: new Date(),
    });

    return result;
  }
};

const findUserByComplain = async (uid) => {
  return await citizensCollection.findOne({ _id: ObjectId(uid) });
};

const findComplainsByWard = async (ward, filter = {}) => {
  if (filter?.complainType === "public") {
    let complains = [];
    const public = await complainsCollection
      .find({ $and: [{ ward }, filter] })
      .sort({ submission_date: -1 })
      .toArray();
    filter = { ...filter, complainType: "public-anonymous" };
    const publicAno = await complainsCollection
      .find({ $and: [{ ward }, filter] })
      .sort({ submission_date: -1 })
      .toArray();
    complains = public.concat(publicAno);
    return complains;
  }
  return await complainsCollection
    .find({ $and: [{ ward }, filter] })
    .sort({ submission_date: -1 })
    .toArray();
};

const findComplainsByUserId = (id) => {
  return complainsCollection
    .find({ citizen_id: ObjectId(id) })
    .sort({ submission_date: -1 })
    .toArray();
};

const deleteComplainById = (id) => {
  return complainsCollection.deleteOne({ _id: ObjectId(id) });
};

const getStatusCountByUser = async (id) => {
  let status = {};
  const pendingApproval = await complainsCollection.countDocuments({
    $and: [{ citizen_id: ObjectId(id) }, { status: "pending approval" }],
  });

  const totalComplains = await complainsCollection.countDocuments({
    citizen_id: ObjectId(id),
  });
  return (status = { pendingApproval, totalComplains });
};

const getComplainsCount = async (ward) => {
  return await complainsCollection.countDocuments({ ward });
};

const countComplainsByStatus = async (key, value) => {
  const searchBy = { [key]: value };
  if (!key) {
    searchBy = {};
  }

  const label = "status";
  const countByStatus = await turnObjPairingCount(label, searchBy);
  return countByStatus;
};

const countComplainByCategory = async (key, value) => {
  const searchBy = { [key]: value };
  const label = "category";
  const countByCategory = await turnObjPairingCount(label, searchBy);
  return countByCategory;
};

const countComplainByType = async (key, value) => {
  const searchBy = { [key]: value };
  const label = "complainType";
  let countByType = await turnObjPairingCount(label, searchBy);
  if (!countByType.public) {
    countByType = { ...countByType, public: 0 };
  } else if (!countByType.private) {
    countByType = { ...countByType, private: 0 };
  }
  return countByType;
};

const turnObjPairingCount = async (label, search) => {
  const complains = await complainsCollection.find(search).toArray();
  if (complains.length < 1) {
    return {};
  }

  let obj = {};
  for (const complain of complains) {
    let key = complain[label];
    if (!key) continue;
    if (key.includes("public")) {
      key = "public";
    }
    if (obj[key]) {
      let count = obj[key] + 1;
      obj = {
        ...obj,
        [key]: count,
      };
    } else {
      obj = {
        ...obj,
        [key]: 1,
      };
    }
  }
  return obj;
};

const updateComplainStatus = async (complain_id, status) => {
  return await complainsCollection.updateOne(
    { _id: ObjectId(complain_id) },
    { $set: { status } }
  );
};

const editComplainCategory = async (complain_id, category) => {
  return await complainsCollection.updateOne(
    { _id: ObjectId(complain_id) },
    { $set: { category } }
  );
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
  getComplainsCount,
  countComplainsByStatus,
  countComplainByCategory,
  countComplainByType,
  findComplainsByWard,
  updateComplainStatus,
  editComplainCategory,
};
