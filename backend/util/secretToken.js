require("dotenv").config();
const jwt = require("jsonwebtoken");
secretkey = 'thefirstinfallibleimam'
module.exports.createToken = (id, email) => {

  console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET); // Debugging line
  
  return jwt.sign({ id, email },secretkey, {
    expiresIn: "3h",
  });
};
