const express = require("express");
const user = require("../controllers/user.controller");

const userRouter = express.Router();
userRouter.post("/register", user.register);

module.exports = userRouter;
