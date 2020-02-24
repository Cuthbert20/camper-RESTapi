const Bootcamp = require("../models/Bootcamp");

//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find(); //any method after Bootcamp is a built in mongoose method.

    res.status(200).json({ success: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false, mgs: err });
  }
  //   res.status(200).json({ success: true, mgs: "Show all bootcamps" });
};

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id); //any method after Bootcamp is a built in mongoose method.

    if (!bootcamp) {
      //we have to return because of multipule responses inside our try block.
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, mgs: err });
  }

  //   res.status(200).json({ success: true, mgs: `Get bootcamp ${req.params.id}` });
};

//@desc Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body); //any method after Bootcamp is a built in mongoose method.
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Get all bootcamps
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }); //any method after Bootcamp is a built in mongoose method.
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
  //   res
  //     .status(200)
  //     .json({ success: true, mgs: `Update bootcamp ${req.params.id}` });
};

//@desc Delete a bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
  } catch (err) {}
  res
    .status(200)
    .json({ success: true, mgs: `Delete Bootcamp ${req.params.id}` });
};
