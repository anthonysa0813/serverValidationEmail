const checkHeaders = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
};

module.exports = checkHeaders;
