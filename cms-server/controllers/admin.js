const { findAdminByProperty } = require("../service/authAdmin");

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

module.exports = { getCurrentUser };
