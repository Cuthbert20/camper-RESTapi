const Bootcamp = require("../models/Bootcamp");
//Importing class from utils folder
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //! console.log request queries that were passed into the url
  console.log(req.query);
  let query;
  //! making a copy of req.query call reqQuery and pull select out so we can just get back specific values
  const reqQuery = { ...req.query };

  // Fields to exclude, that I don't want to be matched
  const removeFields = ["select", "sort"];

  // Loop over removeFields and delete them from reQuery
  removeFields.forEach(param => delete reqQuery[param]);

  console.log("query includes select === {}", reqQuery);

  // Create a Query String
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, ect)
  queryStr = queryStr.replace(/\b(gt|gte|lte|lt|in)\b/g, match => `$${match}`);
  // console.log(queryStr);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    // Creating array of fields if select is in request query ie /api/v1/bootcamps?select=name,description
    // Using .split() method on req.query.select string. Then joining back into a string using .join() method
    // console.log(fields);
    query = query.select(fields);
  }

  // Sort, same as above for Fields
  if (req.query.sort) {
    // Turn into array at , then creating string with spaces where , were.
    const sortBy = req.query.sort.split(",").join(" ");

    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //!We are passing the req.query object to .find mongoDB method any queries passed into url .find with search and find bootcamps where thoose values are true.
  // Executing query
  const bootcamps = await query;
  //!Replaced try catch block with asyncHander see middleware folder
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });

  //   res.status(200).json({ success: true, mgs: "Show all bootcamps" });
});

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id); //any method after Bootcamp is a built in mongoose method.

  if (!bootcamp) {
    //we have to return because of multipule responses inside our try block.
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });

  //   res.status(200).json({ success: true, mgs: `Get bootcamp ${req.params.id}` });
});

//@desc Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body); //any method after Bootcamp is a built in mongoose method.
  res.status(201).json({ success: true, data: bootcamp });
});

//@desc Get all bootcamps
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body); //we can access the request body because of the body parser ie. app.use(express.json()) on the server.

  const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  }); //any method after Bootcamp is a built in mongoose method.
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
  //   res
  //     .status(200)
  //     .json({ success: true, mgs: `Update bootcamp ${req.params.id}` });
});

//@desc Delete a bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  res
    .status(200)
    .json({ success: true, data: `${bootcamp.name} has been removed` });
});

//@desc Get bootcamps within a global/radius using 2 parameters zipcode && distance (ie miles)
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  //destructuring params coming from url.
  const { zipcode, distance } = req.params;

  // Get latitude/longitude from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  console.log(loc);
  // Calc radius using radians
  //Divide distance by radius of Earth
  // Earth Radius = 3,963 miles
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    //$geoWithin: {$centerSphere: [[<x>, <y>], <radius>]}
    //$geoWithin: { $centerSphere: [ [ <x>, <y> ], <radius> ] }
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res
    .status(200)
    .json({ sucess: true, count: bootcamps.length, data: bootcamps });
});
