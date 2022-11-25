const { findAdminByProperty } = require("../service/authAdmin");
const {
  getComplainsCount,
  countComplainsByStatus,
  countComplainByCategory,
  countComplainByType,
  findComplainsByUserId,
  findComplainsByWard,
} = require("../service/complainsFunc");
const {
  getCommentsByComplainId,
  getVotesByComplainId,
  findCommentsPerComplain,
} = require("../service/reactionsDbOp");
const {
  getUsers,
  getUsersCount,
  getCitizensByWard,
  updateUserStatus,
  deleteUserById,
  findUserByProperty,
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

const changeUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateUserStatus(id, status);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteUserById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const userDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findUserByProperty("_id", id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getComplainsByUserId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await findComplainsByUserId(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getComments = async (req, res, next) => {
  const complainId = req.params.id;
  try {
    const data = await getCommentsByComplainId(complainId);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTotalReact = async (req, res, next) => {
  const { cid } = req.query;
  try {
    const votecount = await getVotesByComplainId(cid);
    const comments = await findCommentsPerComplain(cid);
    const response = { votes: votecount, comments };
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const loadComplains = async (req, res, next) => {
  try {
    const user = req.user;
    const queries = req.query;
    const complains = await findComplainsByWard(user.ward, queries.filter);
    res.status(200).json(complains);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  getDataCount,
  citizenByward,
  changeUserStatus,
  deleteUser,
  userDetails,
  getComplainsByUserId,
  getComments,
  getTotalReact,
  loadComplains,
};
