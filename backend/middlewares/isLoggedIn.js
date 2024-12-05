const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // Check for token in cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ isLoggedIn: false, user: null });
    }

    // Decode and verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ isLoggedIn: false, user: null });
    }

    // Find user from the database
    const user = await User.findById(decoded.id).catch((err) => {
      console.error("Error fetching user:", err);
      return null;
    });

    if (!user) {
      return res.status(401).json({ isLoggedIn: false, user: null });
    }

    // Attach user info to the request and proceed
    req.user = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    next();
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
