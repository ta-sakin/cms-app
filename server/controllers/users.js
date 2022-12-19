const {
  findUserByProperty,
  patchUser,
  getUsersCount,
} = require("../service/user");

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await findUserByProperty("_id", id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (data.name) {
      const result = await patchUser(id, data);
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const data = await getUsersCount();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const data = await findUserByProperty("phone", phone);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { getUserById, updateUser, getAllUsers, getCurrentUser };
