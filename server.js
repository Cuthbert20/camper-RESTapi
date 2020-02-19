const express = require("express");
const dotenv = require("dotenv");
const app = express();
const logger = require("./middleware/logger");
//Morgan will replace our logger
const morgan = require("morgan");
//?Route Files
const bootcamps = require("./routes/bootcamps");

//Load Enviroment Variables from our env file config.env
dotenv.config({ path: "./config/config.env" });

//Middleware
// app.use(logger);
//Dev loggin middlware, should only run in development enviroment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount routes, middleware
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
