const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  //   res.send("<h1>Test</h1>");
  //   res.json({ name: "Spencer" });
  //   res.sendStatus(400);
  //   res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: { id: 1 } });
});
//Routes Full CRUD
router.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, mgs: "Show all bootcamps" });
});

router.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success: true, mgs: `Get bootcamp ${req.params.id}` });
});

router.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, mgs: "Create new bootcamp" });
});

router.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, mgs: `Update bootcamp ${req.params.id}` });
});

router.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, mgs: `Delete Bootcamp ${req.params.id}` });
});
