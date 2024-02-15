import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
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
  router.get("/edit-user/:id", homeController.handleUpdateUser);
  router.post("/users/update-user", homeController.handleUpdateUserWithId);

  router.get("/api/test-api", apiController.testApi);

  return app.use("/", router);
};

export default initwebRoutes;
