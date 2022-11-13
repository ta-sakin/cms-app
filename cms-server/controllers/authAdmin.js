const jwt = require("jsonwebtoken");
const { postAdmin } = require("../service/authAdmin");

const createAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    let { email, role } = data;
    if (email.includes("@councillor")) {
      role = "councillor";
    } else if (email.includes("@mayor")) {
      role = "mayor";
    } else {
      return res.status(400).json({ message: "Your email is not authorized" });
    }

    const payLoad = { email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const result = await postAdmin(data);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAdmin };
