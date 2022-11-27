const { datesCollection } = require("../model/Admin");

const updateStatusDate = async (complain_id, status) => {
  return await datesCollection.updateOne(
    { complain_id },
    { $set: { [status]: new Date() } },
    { upsert: true }
  );
};

module.exports = { updateStatusDate };
