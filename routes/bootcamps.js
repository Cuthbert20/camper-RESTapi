const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require("../controllers/bootcamps");

// Include other resource routers such as courses router, reviews router, ect.
const courseRouter = require("./courses");

const router = express.Router();

// Middleware to Re-route into other resource routers souch as courses or review router.
router.use("/:bootcampId/courses", courseRouter);

router.get("/test", (req, res) => {
  //   res.send(`<h1>${req.hello}</h1>`);
  res.json({ name: "Spencer" });
  //   res.sendStatus(400);
  //   res.status(400).json({ success: false });
  //   res.status(200).json({ success: true, data: { id: 1 } });
});

//Routes Full CRUD
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

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
