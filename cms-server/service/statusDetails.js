const { ObjectId } = require("mongodb");
const { statusDetailsCollection } = require("../model/Admin");

const postStatusDetails = async ({
  date_status_start,
  date_status_end,
  complain_status,
  ...rest
}) => {
  if (
    complain_status.includes("hold") ||
    complain_status.includes("rejected")
  ) {
    return await statusDetailsCollection.insertOne({
      name: "",
      contact: "",
      designation: "",
      email: "",
      remarks: rest.remarks,
      complain_id: rest.complain_id,
      status_type: rest.status_type,
    });
  }
  return await statusDetailsCollection.insertOne(rest);
};

const findStatusDetails = async (id, status_type) => {
  return await statusDetailsCollection.findOne({
    $and: [{ complain_id: id }, { status_type }],
  });
};

const putAssignedComplain = async (data) => {
  const { _id, ...rest } = data;

  return await statusDetailsCollection.updateOne(
    { _id: ObjectId(_id) },
    { $set: rest }
  );
};

module.exports = { postStatusDetails, findStatusDetails, putAssignedComplain };
