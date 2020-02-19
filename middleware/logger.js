//@desc Logs request to console/terminal
const logger = (req, res, next) => {
  const { method, originalUrl, protocol } = req;
  console.log(`${method} ${protocol}://${req.get("host")}${originalUrl}`);
  next();
};

module.exports = logger;
