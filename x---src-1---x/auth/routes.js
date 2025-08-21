const express = require("express");
const authController = require("./controllers");

const routes = express.Router();

routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post("/logout", authController.logout);
routes.post("/profile", authController.profile);

module.exports = routes;