require("dotenv").config();
import jwt from "jsonwebtoken";
const nonSercurePaths = ["/", "/register", "/login"];
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token;
  try {
    token = jwt.sign(payload, key);
  } catch (e) {
    console.log(e);
  }

  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    console.log(e);
  }

  return decoded;
};

const checkUserJWT = (req, res, next) => {
  if (nonSercurePaths.includes(req.path)) return next();
  let cookie = req.cookies;
  console.log(cookie);
  if (cookie && cookie.jwt) {
    let token = cookie.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "not authenticated user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "not authenticated user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSercurePaths.includes(req.path)) return next();
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "you dont have permission to access thuisss resourse",
      });
    }
    let canAccess = roles.some((item) => item.url === currentUrl);

    console.log("check can access", canAccess);

    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "you dont have permission to access thuisa resourse",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "not authenticated user",
    });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
