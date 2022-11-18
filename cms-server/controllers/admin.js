const { findAdminByProperty } = require("../service/authAdmin");
const {
  getComplainsCount,
  countComplainsByStatus,
  countComplainByCategory,
  countComplainByType,
} = require("../service/complainsFunc");
const { getUsers, getUsersCount } = require("../service/user");

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
    const solved = await countComplainsByStatus(ward, "Closed");
    const pendingApproval = await countComplainsByStatus(
      ward,
      "pending approval"
    );
    const category = await countComplainByCategory(ward);
    let public = await countComplainByType(ward, "public");
    const anonym = await countComplainByType(ward, "public-anonymous");
    const private = await countComplainByType(ward, "private");

    public = public + anonym;

    res.status(200).json({
      users,
      complains,
      solved,
      pendingApproval,
      private,
      public,
      category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getCurrentUser, getDataCount };
