const express = require("express");

const post = require("../controllers/post.controller");
const Auth = require("../middle/auth");

const postRouter = express.Router();
postRouter.post("/add", Auth, post.addPost);
postRouter.get("/get", Auth, post.getPosts);
postRouter.put("/update/:postId/:userId", Auth, post.updatePost);
postRouter.delete("/delete/:userId/:postId", Auth, post.deletePost);

module.exports = postRouter;
