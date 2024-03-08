import express from "express";
import userController from "../controller/userController";
import apiController from "../controller/apiController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();
/**
 *
 * @param {*} app
 */

// const checkUser = (req, res, next) => {
//   const nonSercurePaths = ["/register", "/login"];
//   if (nonSercurePaths.includes(req.path)) return next();
//   if (user) {
//     next();
//   } else {
//   }
// };

const initapiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user/read", userController.readFucn);
  router.post("/user/create", userController.createFucn);
  router.put("/user/update", userController.updateFucn);
  router.delete("/user/delete", userController.deleteFucn);

  router.get("/group/read", groupController.readFucn);

  return app.use("/api/v1/", router);
};

export default initapiRoutes;
