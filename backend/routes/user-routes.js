const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  getAllUsers,
} = require("../controllers/users-controllers");
const { check } = require("express-validator");

router.get("/", getAllUsers);

router.post(
  "/signup",
  [
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signUp
);

router.post("/login", login);

module.exports = router;
