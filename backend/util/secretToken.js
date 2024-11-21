require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
    expiresIn: "3h",
  });
};
