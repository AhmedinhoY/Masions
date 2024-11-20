const HttpError = require('../models/http-error');
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');


// generate this key randomly later as an improvment
const KEY = 'a3f5b9d9c715f0a837c4a5c3d6e2f98be8e5f76a7c3d9f5e8a3b9c7e5f8d3a2c'

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


  // the password shall travel to this server from the client (frontend) using https 
  // this depends on the deployment of the application 
  let hashedPassword;
  try {
    // bcrypt.hash can fail that's why we shall use 
    // try {} ... catch (err) {}
    // hashing the password with 12 salting rounds to generate a quick hash 
    // and to make it strong enough to not reverse engineer the hash
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could Not create user please try again later',
      500
    );

    return next(error);

  }


  const newUser = new User({
    name,
    email,
    password: hashedPassword,
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

  // here generate the token 
  let token;
  try {
    // the entire 'serialization' and 'enconding' is handled by the jsonwebtoken package
  token = sign(
    { userId: newUser.id, email: newUser.email },
    KEY,
    { expiresIn: '1h' }
  );
} catch (err) {
  const error = new HttpError(
    'Server Error: Generating the token failed please try sign up again later',
    500
  ); 
  return next(error);
}



  // joke: hover on .toObject and see --> "converts a document into a plain old js object"
  // they consider JS objects as old objects 
  res.status(201).json({ user: newUser.toObject({ getters: true }) , token });
}


exports.login = async (req, res, next) => {

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in Failed, please try again later',
      500
    );
    return next(error);
  }

  // here we check if the email given
  // has returned a user with this email
  if (!existingUser) {
    const error = new HttpError(' the email or password is incorrect', 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Server Error: Could not log you in, please try again later',
      500
    );

    return next(error);
  }

  // here we check if the password is incorrect
  if (!isValidPassword) {
    const error = new HttpError(
      'Email or Password is incorrect',
      403
    );

    return next(error);
  }



  // here generate the token 
  let token;
  try {
    // the entire 'serialization' and 'enconding' is handled by the jsonwebtoken package
  token = sign(
    { userId: existingUser.id, email: existingUser.email },
    KEY,
    { expiresIn: '1h' }
  );
} catch (err) {
  const error = new HttpError(
    'Server Error: Generating the token failed please try to login again later',
    500
  ); 
  return next(error);
}



  res.status(200).json({
    user: existingUser.toObject({ getters: true }),
    token
  });

}



// 401 - authentication failed 
// 422 - invalid user input 
// 404 - route not found
// 500 - general error codes 