const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const findToken = () => {
      // check if token found in cookies
      if (req.cookies.token) {
        console.log("token found in cookies");
        return req.cookies.token;
      }
    };

    const token = findToken();

    if (!token) {
      req.user = null; // Set user as null
      return next();
    }

    // decoding the token with scerect key
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      // No user found for the token
      req.user = null;
      return next(); // Continue to the next middleware/route
    }

    req.user = { id: user.id, email: user.email, roles: user.roles }; // Attach user details to the request
    req.token = token; // Attach token to the request
    next(); // Continue to the next middleware/route
  } catch (error) {
    console.log(error);
    req.user = null;
    next(); // Continue without user info
  }
};
