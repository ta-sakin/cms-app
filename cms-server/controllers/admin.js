const { findAdminByProperty } = require("../service/authAdmin");
const {
  getComplainsCount,
  countComplainsByStatus,
  countComplainByCategory,
  countComplainByType,
} = require("../service/complainsFunc");
const {
  getUsers,
  getUsersCount,
  getCitizensByWard,
} = require("../service/user");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw "Intruder";
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getDataCount = async (req, res, next) => {
  try {
    // const { ward } = req.query;
    const user = req.user;
    const { ward } = user;

    const users = await getUsersCount(ward);
    const complains = await getComplainsCount(ward);
    const status = await countComplainsByStatus("ward", ward);
    const category = await countComplainByCategory("ward", ward);
    let type = await countComplainByType("ward", ward);

    res.status(200).json({
      users,
      complains,
      status,
      category,
      type,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const citizenByward = async (req, res, next) => {
  try {
    const user = req.user;
    const { ward } = user;
    const users = await getCitizensByWard(ward);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getCurrentUser, getDataCount, citizenByward };
