import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();
/**
 *
 * @param {*} app
 */

const initwebRoutes = (app) => {
  router.get("/", homeController.handleHome);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  // router.get("/user", homeController.handleGetUserList);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  return app.use("/", router);
};

export default initwebRoutes;
