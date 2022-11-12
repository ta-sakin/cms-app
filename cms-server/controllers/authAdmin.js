const jwt = require("jsonwebtoken");
const { postAdmin } = require("../service/authAdmin");

const createAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await postAdmin(data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAdmin };
