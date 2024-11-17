const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// util functions
const handleError = (msg, code, next) => {
  const error = new HttpError(msg, code);
  return next(error);
};

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
      return handleError(
        "Submission Failed, Please provide valid inputs",
        422,
        next
      );
    }

    // destructuring the request
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return handleError("This user already exists, please login", 422, next);
    }

    /* before we register the user we need to hash password to ensure security and privacy.
    we will do this using third party authentication library called bcrypt */

    // init var to store hashed password
    const hashedPassword = await bcrypt.hash(password, 12); // will use hash function from bcrypt library.

    /*  It takes 2 args: the password we need to hash and no. of salts.
      A salt is a random string added to the password before hashing. Its purpose is to ensure that even if two users have the same password, their hashed passwords will look different, making it harder for  attackers to use precomputed tables (like rainbow tables) to crack passwords. */

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      places: [],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbdspcRNHvZL8uU406KbxA0otzbKbU9WWNzg&s",
    });

    await newUser.save();

    const token = jwt.sign(
      { userID: newUser.id, email: newUser.email },
      "supersecret_dont_share",
      { expiresIN: "1h" }
    );

    res
      .status(201)
      .json({ userID: newUser.id, email: newUser.email, token: token });
  } catch (err) {
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

    const token = jwt.sign(
      { userID: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIN: "1h" }
    );

    res.status(200).json({
      userID: existingUser.id,
      email: existingUser.email,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return handleError("Login failed, please try again.", 500, next);
  }
};

// 401 - authentication failed
// 422 - invalid user input
// 404 - route not found
// 500 - general error codes
