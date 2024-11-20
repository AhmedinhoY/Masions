const HttpError = require("../models/http-error")
const { verify } = require('jsonwebtoken');


// generate this key randomly later as an improvment
const KEY = 'a3f5b9d9c715f0a837c4a5c3d6e2f98be8e5f76a7c3d9f5e8a3b9c7e5f8d3a2c'


module.exports = (req, res, next) => {

  // when sending POST, PATCH, DELETE ... 
  // The browser will send an OPTIONS request before it
  // it's a browser behaviour and we need to be aware of it ... 
  if(req.method === 'OPTIONS'){
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // 'Bearer Token' 
    if (!token) {
      throw new Error('Authentication failed');
    }

    const decodedToken = verify(token, KEY); 

    // dynamically add things to the req object
    req.userData = {userId: decodedToken.userId}
    next();
  } catch (err) {

    const error = new HttpError(
      'Authentication Failed - please login or signUp',
      403
    );
    return next(error);
  }

}