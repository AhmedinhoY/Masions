const express = require('express');
const fs = require('fs');
const path = require('path');



const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/user-routes');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
const app = express();


app.use(bodyParser.json());


// serve the images statiscally to the user in order for the user 
// to acess the images
// world wide used technique 
app.use('/uploads/images',express.static(path.join('uploads','images')));

// CORS
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();

});



app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);


app.use((req, res, next) => {
  const error = new HttpError('could not find this route', 404);
  throw error;
});

// error function that express js recognizes it
// a generic error handling function
app.use((error, req, res, next) => {

  if(req.file){
    fs.unlink(req.file.path, err =>{
      console.log(err);
    })
  }

  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error has occured!' });

});



mongoose.connect(
  'mongodb+srv://alishaikhhusain14:1412Imam@cluster0.fvze0.mongodb.net/Place?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err))