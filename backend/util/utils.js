const HttpError = require("../models/http-error");

// handle error function
exports.handleError = (msg, code, next) => {
  const error = new HttpError(msg, code);
  return next(error);
};
