const express = require("express");
const dotenv = require("dotenv");
const app = express();
const logger = require("./middleware/logger");
//Morgan will replace our logger
const morgan = require("morgan");
const connectDB = require("./config/db");

//Load Enviroment Variables from our env file config.env
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//?Route Files
const bootcamps = require("./routes/bootcamps");

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
