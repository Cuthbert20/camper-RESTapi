const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require("../controllers/bootcamps");
const router = express.Router();

router.get("/test", (req, res) => {
  //   res.send("<h1>Test</h1>");
  //   res.json({ name: "Spencer" });
  //   res.sendStatus(400);
  //   res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: { id: 1 } });
});

//Routes Full CRUD
router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
