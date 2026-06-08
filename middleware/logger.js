// Logger middleware — runs on every request before it hits a route
function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();  // pass control to the next middleware/route
}

module.exports = logger;
