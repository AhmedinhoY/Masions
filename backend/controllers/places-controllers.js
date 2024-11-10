const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const Place = require('../models/place');
const User = require('../models/users');

const getCoordinates = require('../util/location');
const { validationResult } = require('express-validator');




exports.getAllPlaces = async (req, res, next) => {

  let places;

  try {
    places = await Place.find(); // returns an array
  } catch (err) {
    const error = new HttpError(
      'could not find any places, please try again or add a new one',
      500
    );
    return next(error);
  }


  res.status(200).json({ places: places.map(p => p.toObject({ getters: true })) })
};

exports.getPlaceById = async (req, res, next) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid);

  } catch (err) {
    const error = new HttpError('Something went wrong, could not find a place',
      500
    );

    return next(error);
  }

  if (!place) {
    return (new HttpError('Could not find the place for the provided place id', 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
}

exports.getPlacesByUserId = async (req, res, next) => {
  const uid = req.params.uid;
  // let places;
  let userWithPlaces

  try {
    userWithPlaces = await User.findById(uid).populate('places'); // returns an array
  } catch (err) {
    const error = new HttpError('Something went wrong, could not find the places created by this id, try again later',
      500
    );

    return next(error);
  }
  // if (!places || places.length == 0){
  if (!userWithPlaces || userWithPlaces.length == 0) {
    return next(
      new HttpError('Could not find places for the provided user id', 404)
    );
  }

  res.json({ places: userWithPlaces.places.map(p => p.toObject({ getters: true })) });
}

exports.createPlace = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('invalid input, please check your input', 422));
  }


  const { title, description, address, creator } = req.body;

  let coordinates;
  try {

    coordinates = await getCoordinates(address); //{}

  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    creator,
    image: 'https://bahrainfinder.bh/wp-content/uploads/2023/02/Bahrainfinder_2023-02-27-7-26-PM_03-758x564.jpg'

  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating Place Failed, please try again later',
      500
    );

    return next(error);
  }

  if (!user) {
    const error = new HttpError('The provided user Id does not exist',
      500
    );

    return next(error);
  }


  try {

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace); // push here is a mongoose method
    await user.save({ session: sess });
    await sess.commitTransaction();

  } catch (err) {
    const error = new HttpError('Creating the place failed, please try again later',
      500
    );

    return next(error);
  }


  res.status(201).json(
    { place: createdPlace, message: ' Place Created Successfully' }
  );

}

exports.updatePlaceById = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError(' to patch a req please provide something for the title, address, description', 422);
  }

  const pid = req.params.pid;
  const { title, description } = req.body;

  let place;

  try {
    place = await Place.findById(pid);
  } catch (err) {
    const error = new HttpError('finding the place failed, please try again later',
      500
    );

    return next(error);
  }


  place.title = title;
  place.description = description;


  try {
    await place.save();
  } catch (err) {
    const error = new HttpError('Updating the place failed, please try again later',
      500
    );

    return next(error);
  }



  res.status(200).json(
    { place: place.toObject({ getters: true }), message: ' Place updated Successfully' }
  );
}

exports.deletePlaceById = async (req, res, next) => {
  const pid = req.params.pid;

  let place;

  try {
    place = await Place.findById(pid).populate('creator');
  } catch (err) {
    const error = new HttpError('finding the place to delete failed, please try again later',
      500
    );

    return next(error);
  }

  if (!place) {
    const error = new HttpError('the provided place id does not exist',
      500
    );
    return next(error);
  }



  try {

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError('deleting the place failed, please try again later',
      500
    );

    return next(error);
  }

  res.status(200).json(
    { message: ' Deleted Place' });
}

