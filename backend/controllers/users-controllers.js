const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { createToken } = require("../util/secretToken");
const { handleError } = require("../util/utils");

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

// Sign up controller
exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return handleError(
        "Submission Failed, Please provide valid inputs",
        422,
        next
      );
    }

    // destructuring the request
    const { name, phoneNumber, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return handleError("This user already exists, please login", 422, next);
    }

    /* before we register the user we need to hash password to ensure security and privacy.
    we will do this using third party authentication library called bcrypt */
    const hashedPassword = await bcrypt.hash(password, 12); // will use hash function from bcrypt library (It takes 2 args: the password we need to hash and no. of salts.).

    const newUser = new User({
      name: name,
      email: email,
      phone: phoneNumber,
      password: hashedPassword,
      places: [],
      image: "",
    });

    await newUser.save();

    const Token = createToken(newUser.id, newUser.email);

    res.cookie("token", Token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ userID: newUser.id, email: newUser.email, token: Token });
  } catch (err) {
    console.log(err);
    handleError("Sign up failed, please try again", 500, next);
  }
};

// Log in controller
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if the user exists or not
    const existingUser = await User.findOne({ email: email });

    // if the user does not exist.
    if (!existingUser) {
      return handleError("Invalid credintials, please try again", 401, next);
    }

    // checking password and hashed password match

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    // above, we used compare function from bcrypt library to check the request password and user's saved password from the db (which we hashed)...
    if (!isValidPassword) {
      return handleError("Invalid credintials, please try again", 401, next);
    }

    // if the login was successful, create token with cookie

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
    });
  } catch (err) {
    console.error(err);
    return handleError("Login failed, please try again.", 500, next);
  }
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) {
    return res.sendStatus(204); // no content
  } else {
    res.clearCookie("token", { withCredentials: true, httpOnly: false });
    res.json({ message: "Cookie cleared" });
  }
};

// 401 - authentication failed
// 422 - invalid user input
// 404 - route not found
// 500 - general error codes
