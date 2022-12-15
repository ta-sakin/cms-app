const { ObjectId } = require("mongodb");
const { datesCollection } = require("../model/Admin");
const { complainsCollection } = require("../model/Users");
const { findAdminByProperty } = require("../service/authAdmin");
const {
  updateStatusDate,
  getStatusDateByCID,
} = require("../service/statusDates");
const {
  getComplainsCount,
  countComplainsByStatus,
  countComplainByCategory,
  countComplainByType,
  findComplainsByUserId,
  findComplainsByWard,
  findComplainByProperty,
  findUserByComplain,
  updateComplainStatus,
} = require("../service/complainsFunc");
const {
  getCommentsByComplainId,
  getVotesByComplainId,
  findCommentsPerComplain,
} = require("../service/reactionsDbOp");
const {
  postStatusDetails,
  findStatusDetails,
  putAssignedComplain,
} = require("../service/statusDetails");
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
      solved: status?.closed ? status.closed : 0,
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
  const { ward } = req.user;
  try {
    let complains = await findComplainsByUserId(id);
    const data = complains.filter((complain) => complain.ward === ward);
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

const complainDetails = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const complain = await findComplainByProperty("_id", cid);
    const user = await findUserByComplain(complain.citizen_id);
    res.status(200).json([complain, user]);
  } catch (error) {
    next(error);
  }
};

const assignComplain = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await postStatusDetails(data);

    const result = await updateStatusDate(
      data.complain_id,
      data.date_status_start,
      data.date_status_end
    );
    const updateResponse = await updateComplainStatus(
      data.complain_id,
      data.complain_status
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
const getStatusDetails = async (req, res, next) => {
  try {
    const { cid, status } = req.query;
    const response = await findStatusDetails(cid, status);

    if (!response) {
      return res.status(200).json({});
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const updateAssignedComplain = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await putAssignedComplain(data);
    if (!response) {
      res.status(200).json({});
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getStatusDate = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const data = await getStatusDateByCID(cid);
    res.status(200).json(data);
  } catch (error) {
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
  complainDetails,
  assignComplain,
  getStatusDetails,
  updateAssignedComplain,
  getStatusDate,
};
