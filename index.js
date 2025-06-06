const express = require("express");
const connection = require("./db/db");
require("dotenv").config();

const app = express();

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
