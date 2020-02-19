const express = require("express");
const dotenv = require("dotenv");
const app = express();

//Load Enviroment Variables from our env file config.env
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
  //   res.send("<h1>Test</h1>");
  //   res.json({ name: "Spencer" });
  //   res.sendStatus(400);
  //   res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: { id: 1 } });
});
//Routes Full CRUD
app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, mgs: "Show all bootcamps" });
});

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success: true, mgs: `Get bootcamp ${req.params.id}` });
});

app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, mgs: "Create new bootcamp" });
});

app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, mgs: `Update bootcamp ${req.params.id}` });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, mgs: `Delete Bootcamp ${req.params.id}` });
});

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
