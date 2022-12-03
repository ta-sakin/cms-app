const { datesCollection } = require("../model/Admin");

const updateStatusDate = async (complain_id, status, status_end) => {
  if (status_end) {
    return await datesCollection.updateOne(
      { complain_id },
      { $set: { [status]: new Date(), [status_end]: new Date() } },
      { upsert: true }
    );
  }

  return await datesCollection.updateOne(
    { complain_id },
    { $set: { [status]: new Date() } },
    { upsert: true }
  );
};
const getStatusDateByCID = async (complain_id) => {
  return await datesCollection.findOne({ complain_id });
};
module.exports = { updateStatusDate, getStatusDateByCID };
