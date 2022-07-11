const isAuthenticated = function (req, res, next) {
  if (!req.username) return res.status(401).end("access denied");
  next();
};

module.exports = isAuthenticated;
