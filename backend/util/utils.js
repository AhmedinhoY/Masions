const HttpError = require("../models/http-error");

// handle error function
exports.handleError = (msg, code, next) => {
  const error = new HttpError(msg, code);
  return next(error);
};

exports.capitalize = (input) => {
  if (Array.isArray(input)) {
    // If it's an array, capitalize each string in the array
    return input.map((str) => {
      if (typeof str === "string") {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
      return str; // If it's not a string, return it as is
    });
  }

  if (typeof input === "string") {
    // If it's a single string, capitalize it
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  return input; // If it's not a string or array, return it as is
};
