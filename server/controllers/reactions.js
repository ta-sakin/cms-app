const { ObjectId } = require("mongodb");
const { votesCollection } = require("../model/Users");
const { findComplainByProperty } = require("../service/complainsFunc");
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
    next(error);
  }
};

const getTotalVotes = async (req, res, next) => {
  const { cid } = req.query;
  try {
    const result = await findComplainByProperty("_id", cid);
    const { total_upvotes, total_downvotes } = result;
    // const data = await getVotesByComplainId(cid);
    return res
      .status(201)
      .json({ totalUpvote: total_upvotes, totalDownvote: total_downvotes });
  } catch (error) {
    next(error);
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
        // downvote: false,
        // upvote: false,
        vote: null,
      };
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getReactionsByUserId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await getVotesByUserId(id);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
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

// const modifyVotes = async (req, res, next) => {
//   try {
//     console.log("hitting");
//     const votes = await votesCollection.find({}).toArray();
//     for (const vote of votes) {
//       if (vote.upvote) {
//         // console.log("upvote", { ...vote, vote: "upvote" });
//         await votesCollection.updateOne(
//           { _id: ObjectId(vote._id) },
//           { $set: { ...vote, vote: "upvote" } },
//           { upsert: true }
//         );
//       } else if (vote.downvote) {
//         // console.log("downvote", { ...vote, vote: "downvote" });
//         await votesCollection.updateOne(
//           { _id: ObjectId(vote._id) },
//           { $set: { ...vote, vote: "downvote" } },
//           { upsert: true }
//         );
//       } else {
//         // console.log("null", { ...vote, vote: null });

//         await votesCollection.updateOne(
//           { _id: ObjectId(vote._id) },
//           { $set: { ...vote, vote: null } },
//           { upsert: true }
//         );
//       }
//     }
//     const modified = await votesCollection.find({}).toArray();
//     res.json(modified);
//   } catch (error) {}
// };
module.exports = {
  updateVote,
  getReactionsByUserId,
  createCommment,
  getComments,
  getTotalVotes,
  getUsersVotes,
  // modifyVotes,
};
