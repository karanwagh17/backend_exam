const express = require("express");
const connection = require("./db/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.set("view engine", "ejs");

const port = process.env.Port;

app.listen(port || 8080, async () => {
  try {
    await connection;
    console.log("monogo connected");
    console.log("server is running on port ", port || 8080);
  } catch (error) {
    console.log(error);
  }
});
