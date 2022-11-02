const { complainService } = require("../service/complain");

const complainControllers = async (req, res, next) => {
  let { address, ward, description, imgUrls, type, phone } = req.body;
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
  try {
    const data = await complainService({
      address,
      ward,
      description,
      imgUrls,
      complainType,
      phone,
    });
    if (data) {
      return res.status(201).json({ message: "Submission successful", data });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { complainControllers };
