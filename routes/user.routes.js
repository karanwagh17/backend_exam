const express = require("express");
const user = require("../controllers/user.controller");
const Auth = require("../middle/auth");

const userRouter = express.Router();
userRouter.post("/register", user.register);
userRouter.post("/login", user.login);
userRouter.get("/logout", Auth, user.logout);

module.exports = userRouter;
