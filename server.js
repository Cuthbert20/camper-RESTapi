const express = require("express");
const dotenv = require("dotenv");
const app = express();

//?Route Files
const bootcamps = require("./routes/bootcamps");

//Load Enviroment Variables from our env file config.env
dotenv.config({ path: "./config/config.env" });

//Middleware

const logger = (req, res, next) => {
  const { method, originalUrl, protocol } = req;
  console.log(`${method} ${protocol}://${req.get("host")}${originalUrl}`);
  next();
};
app.use(logger);
//Mount routes, middleware
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
