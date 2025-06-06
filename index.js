const express = require("express");
const connection = require("./db/db");
require("dotenv").config();
const userRouter = require("./routes/user.routes");


const app = express();
app.use(express.json());
app.use("/users", userRouter);

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
