const jwt = require("jsonwebtoken");
const { findAdminByProperty } = require("../service/authAdmin");
const { findUserByProperty } = require("../service/user");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    let user;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    token = token?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.phone) {
      user = await findUserByProperty("phone", decoded.phone);
    } else if (decoded.email) {
      user = await findAdminByProperty("email", decoded.email);
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized access" });
  }
}

module.exports = authenticate;
