const { signInService, signUpService } = require("../service/auth");
const { findUserByProperty } = require("../service/user");
const error = require("../utils/error");
const jwt = require("jsonwebtoken");

const signUpControllers = async (req, res, next) => {
  const { name, email, phone, ward, address } = req.body;
  if (!name || !email || !phone || !ward || !address) {
    return res.status(400).send({ message: "Invalid data" });
  }
  try {
    const user = await signUpService({ name, email, phone, ward, address });
    res.status(201).json({ message: "User created successfully", user });
  } catch (e) {
    console.log(e);
    const err = error(e)
    next(e);
  }
};

const signInControllers = async (req, res, next) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).send({ message: "Invalid data" });
  }
  try {
    const user = await findUserByProperty("phone", phone);
    if (user) {
      return res.status(201).send({ message: "Valid User", user });
    }
    return res.status(400).send({ message: "User not found" });
  } catch (e) {
    console.log(e);
    const err = error(e)
    next(e);
  }
};

const checkUserControllers = async (req, res, next) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).send({ message: "Invalid data" });
  }
  try {
    const user = await findUserByProperty("phone", phone);
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    res.status(201).send({ message: "Valid User", user });
  } catch (e) {
    console.log(e);
    const err = error(e)
    next(e);
  }
};

const tokenControllers = async (req, res, next) => {
  const { phone } = req.body;
  const payLoad = { phone: phone };
  const token = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.send(token);
};
module.exports = {
  signUpControllers,
  signInControllers,
  checkUserControllers,
  tokenControllers,
};
