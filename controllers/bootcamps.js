//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, mgs: "Show all bootcamps" });
};

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, mgs: `Get bootcamp ${req.params.id}` });
};

//@desc Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, mgs: "Create new bootcamp" });
};

//@desc Get all bootcamps
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, mgs: `Update bootcamp ${req.params.id}` });
};

//@desc Delete a bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, mgs: `Delete Bootcamp ${req.params.id}` });
};