const errorHandler = (err, req, res, next) => {
  //Log to console for dev
  console.log(err.stack.red); //using color package to return console.log data in red.

  res.status(500).json({ success: false, error: err.message });
};

module.exports = errorHandler;
