const express = require("express");
const dotenv = require("dotenv");
const app = express();

//Load Enviroment Variables from our env file config.env
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
  res.end("test");
});

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
