const jwt = require("jsonwebtoken");
const { postAdmin, findAdminByProperty } = require("../service/authAdmin");
const error = require("../utils/error");

const createAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    let { email, role } = data;
    if (email.includes("councillor@")) {
      role = "councillor";
    } else if (email.includes("mayor@")) {
      role = "mayor";
    } else {
      return res.status(400).json({ message: "Your email is not authorized" });
    }
    const user = findAdminByProperty("email", email);
    if (user?.email) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const result = await postAdmin(data);
    const payLoad = { email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET_KEY_ADMIN, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const getToken = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) throw "Unauthorized";
    const payLoad = { email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET_KEY_ADMIN, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const checkJWT = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    const e = error("Unauthorized", 403);
    next(e);
  }
};
module.exports = { createAdmin, getToken, checkJWT };
