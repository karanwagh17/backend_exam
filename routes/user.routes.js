const express = require("express");
const user = require("../controllers/user.controller");

const userRouter = express.Router();
userRouter.post("/register", user.register);
userRouter.post("/login", user.login);
userRouter.get("/logout", user.logout);

module.exports = userRouter;
