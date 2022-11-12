const {
  putVotes,
  getVotesByUserId,
  postComment,
  getCommentsByComplainId,
  getVotesByComplainId,
  getCurrentUsersVote,
} = require("../service/reactionsDbOp");

const updateVote = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await putVotes(data);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const getTotalVotes = async (req, res, next) => {
  const { cid } = req.query;
  try {
    const data = await getVotesByComplainId(cid);
    return res.status(201).json(data);
  } catch (error) {
    next(error)

  }
};

const getUsersVotes = async (req, res, next) => {
  const { cid, uid } = req.query;
  try {
    let result = await getCurrentUsersVote(cid, uid);
    if (result === null) {
      result = {
        citizen_id: uid,
        complain_id: cid,
        downvote: false,
        upvote: false,
      };
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error)

  }
};

const getReactionsByUserId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await getVotesByUserId(id);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const createCommment = async (req, res, next) => {
  const comment = req.body;
  try {
    if (comment.comment) {
      const data = await postComment(comment);
      return res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const getComments = async (req, res, next) => {
  const complainId = req.params.id;
  try {
    const data = await getCommentsByComplainId(complainId);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error)
  }
};

module.exports = {
  updateVote,
  getReactionsByUserId,
  createCommment,
  getComments,
  getTotalVotes,
  getUsersVotes,
};
