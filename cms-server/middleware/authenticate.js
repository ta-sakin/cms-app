const jwt = require("jsonwebtoken");
const { findAdminByProperty } = require("../service/authAdmin");
const { findUserByProperty } = require("../service/user");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    token = token?.split(" ")[1];
    let user;
    if (token === "null" || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.phone) {
      user = await findUserByProperty("phone", decoded.phone);
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
}

async function adminAuth(req, res, next) {
  try {
    let token = req.headers.authorization;
    token = token?.split(" ")[1];
    let user;
    if (token === "null" || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN);

    if (decoded.email) {
      user = await findAdminByProperty("email", decoded.email);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
}

module.exports = { authenticate, adminAuth };
