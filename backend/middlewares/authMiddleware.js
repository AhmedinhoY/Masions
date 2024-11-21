const jwt = require("jsonwebtoken");
const handleError = require("../util/utils");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // to get the token from the req cookie
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

    req.userData = { userID: decodedToken.userID }; //save the user id in the req body for future use

    next();
  } catch (err) {
    handleError("Authentication Failed", 401, next);
  }
};
