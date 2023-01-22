const { complainService } = require("../service/complain");
const {
  getComplains,
  putVotes,
  updateComplainsReactions,
  findUserByComplain,
  findComplainsByUserId,
  deleteComplainById,
  getStatusCountByUser,
  countComplainsByStatus,
  editComplainCategory,
} = require("../service/complainsFunc");
const natural = require("natural");
const { findCommentsPerComplain } = require("../service/reactionsDbOp");
const { complainsCollection } = require("../model/Users");
const { findUserByProperty } = require("../service/user");
const { getStatusDateByCID } = require("../service/statusDates");
const { ObjectId } = require("mongodb");

const submitComplain = async (req, res, next) => {
  let { address, ward, description, imgUrls, type, phone } = req.body;
  const user = await findUserByProperty("phone", phone);

  if (user?.status === "blocked") {
    return res.status(403).json("User has been blocked");
  }
  if (!imgUrls) imgUrls = [];
  if (!address || !ward || !description) {
    return res.status(400).json({ message: "Invalid information" });
  }

  let complainType;
  if (type.publicSubmit) {
    complainType = "public";
    if (type.anonymous) {
      complainType = "public-anonymous";
    }
  } else {
    complainType = "private";
  }

  const classifyComplain = async (description, callback) => {
    let classifier = new natural.BayesClassifier();
    natural.BayesClassifier.load(
      "classifier.json",
      null,
      function (err, classifier) {
        const category = classifier.classify(description);
        return callback(category);
      }
    );
  };

  classifyComplain(description, async function (category) {
    try {
      const data = await complainService({
        citizen_id: user._id,
        address,
        ward,
        description,
        imgUrls,
        complainType,
        phone,
        category,
      });
      if (data) {
        return res.status(201).json({ message: "Submission successful", data });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
};

const getAllComplains = async (req, res, next) => {
  try {
    const queries = req.query;
    const data = await getComplains(queries);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const totalComplains = async (req, res, next) => {
  try {
    const data = await complainsCollection.countDocuments({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateComplain = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await updateComplainsReactions(data);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const findUserName = async (req, res, next) => {
  const { uid, cid } = req.query;
  try {
    const data = await findUserByComplain(uid);
    const total = await findCommentsPerComplain(cid);

    res.status(200).json([data.name, total]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getComplainByUserId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await findComplainsByUserId(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteComplain = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await deleteComplainById(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCountComplaintStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const data = findComplainsByUserId(id);
    // const data = await getStatusCountByUser(id);
    const objectId = ObjectId(id);
    const count = await complainsCollection.countDocuments({
      citizen_id: objectId,
    });
    const data = await countComplainsByStatus("citizen_id", objectId);
    res.status(200).json({ data, count });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getStatusDatesByCID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getStatusDateByCID(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const data = await editComplainCategory(id, category);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitComplain,
  getAllComplains,
  updateComplain,
  findUserName,
  getComplainByUserId,
  deleteComplain,
  totalComplains,
  getCountComplaintStatus,
  getStatusDatesByCID,
  editCategory,
};
