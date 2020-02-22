const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
//Morgan will replace our logger
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

//Load Enviroment Variables from our env file config.env
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//?Route Files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Body parser
app.use(express.json());

//Middleware
// app.use(logger);
//Dev loggin middlware, should only run in development enviroment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount routes, middleware
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
