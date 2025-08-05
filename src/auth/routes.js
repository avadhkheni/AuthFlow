const express = require("express");
const authController = require("./controllers");
const authUser =require("./middleware/authUser");
const guestOnly = require("./middleware/guestOnly");


const routes = express.Router();

routes.post("/register", authController.register);
routes.post("/login",guestOnly , authController.login);
routes.post("/logout",authUser , authController.logout);
// routes.post("/profile", authUser, authController.profile);

module.exports = routes;