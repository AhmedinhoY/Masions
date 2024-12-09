const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { createToken } = require("../util/secretToken");
const { handleError } = require("../util/utils");
const { capitalize } = require("../util/utils.js");

// get all users controller
exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    handleError("Fetching users failed, please try again", 500, next);
  }

  res
    .status(200)
    .json({ users: users.map((u) => u.toObject({ getters: true })) });
};

exports.getAllUsersForMessages = async (req, res, next) => {
  const LoggedInUser = req.user.id;
  console.log(LoggedInUser);
  const Users = await User.find({ _id: { $ne: LoggedInUser } }).select(
    "-password"
  );
  res.status(200).json(Users);
};

// Sign up controller
exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return handleError(
        "Submission Failed, Please provide valid inputs",
        422,
        next
      );
    }

    let { name } = req.body;
    name = capitalize(name);
    const { phoneNumber, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return handleError("This user already exists, please login", 422, next);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    const Token = createToken(newUser.id, newUser.email);
    res.cookie("token", Token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.status(201).json({
      userID: newUser.id,
      email: newUser.email,
      token: Token,
      roles: newUser.roles,
    });
  } catch (err) {
    handleError("Sign up failed, please try again", 500, next);
  }
};

// Log in controller
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return handleError("Invalid credintials, please try again", 401, next);
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return handleError("Invalid credintials, please try again", 401, next);
    }

    const Token = createToken(existingUser.id, existingUser.email);

    res.cookie("token", Token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.status(201).json({
      userID: existingUser.id,
      email: existingUser.email,
      token: Token,
      roles: existingUser.roles,
    });
  } catch (err) {
    console.error(err);
    return handleError("Login failed, please try again.", 500, next);
  }
};

// Log out controller
exports.logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) {
    return res.sendStatus(204);
  }

  res.clearCookie("token", { withCredentials: true, httpOnly: false });
  return res.status(200).json({ message: "Cookie cleared" });
};

// Update to seller controller
exports.updateToSeller = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    let { agency } = req.body;
    agency = capitalize(agency);
    const { cpr } = req.body;
    const file = req.file;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cpr = cpr;
    user.agency = agency;
    user.image = file.filename;
    user.roles = "seller";
    user.places = [];

    await user.save();

    res.status(200).json({
      message: "User updated to seller successfully.",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
