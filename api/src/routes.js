const { Router } = require("express");

// const auth = require('./app/middlewares/auth')
const UserController = require("./app/controllers/UserController");
const Auth = require("./app/middlewares/auth");

const routes = Router();

routes.get("/dev/getall", Auth.verifyTokenMid, UserController.getAll);
routes.get("/profile/info", Auth.verifyTokenMid, UserController.getProfileInfo);
routes.post(
  "/profile/update",
  Auth.verifyTokenMid,
  UserController.updateProfileInfo
);

routes.post("/signup", UserController.signUp);
// routes.get("/:id", UserController.getUserInfo)
routes.post("/login", UserController.login);

routes.get("/auth/verify", Auth.verifyToken);

module.exports = routes;
