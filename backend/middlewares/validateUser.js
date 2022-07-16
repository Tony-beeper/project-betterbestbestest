const statusCode = require("../utils/StatusCodes");
const Message = require("../utils/defaultMessages");
const isAuthenticated = function (req, res, next) {
  if (!req.username)
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(Message.createErrorMessage("Access Denied"));
  next();
};

module.exports = isAuthenticated;
