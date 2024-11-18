const HttpError = require('../models/http-error');
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const User = require('../models/users');



exports.getAllUsers = async (req, res, next) => {

  let users;

  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'getting all the users failed, please try again later',
      500
    );
  }

  res.status(200).json({ users: users.map(u => u.toObject({ getters: true })) });


}


exports.signUp = async (req, res, next) => {

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(new HttpError(
      'to signup  please provide something for the name, valid email, min password length 3',
      422));
  }


  const { name, email, password } = req.body;

  console.log(req.file); // check if the image is there correctly


  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up Failed, please try again later - 1',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'This user exists , please login',
      422
    );
    return next(error);
  }



  const newUser = new User({
    name,
    email,
    password,
    places: [],
    image: req.file.path
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up Failed, please try again later - 2',
      500
    );
    return next(error);
  }


  res.status(201).json({ user: newUser.toObject({ getters: true }) });
}


exports.login = async (req, res, next) => {

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up Failed, please try again later - 1',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password != password) {
    const error = new HttpError(' the email or password is incorrect ', 401);
    return next(error);
  }

  res.status(200).json({
    message: 'Logged In',
    user: existingUser.toObject({ getters: true })
  });
}



// 401 - authentication failed 
// 422 - invalid user input 
// 404 - route not found
// 500 - general error codes 