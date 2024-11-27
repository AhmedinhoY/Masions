const HttpError = require("../models/http-error");
const mongoose = require("mongoose");

const fs = require("fs");

const Place = require("../models/place");
const User = require("../models/users");

const getCoordinates = require("../util/location");
const { validationResult } = require("express-validator");

exports.getAllPlaces = async (req, res, next) => {
  let places;

  try {
    places = await Place.find(); // returns an array
  } catch (err) {
    const error = new HttpError(
      "could not find any places, please try again or add a new one",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ places: places.map((p) => p.toObject({ getters: true })) });
};

exports.getPlaceById = async (req, res, next) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid).populate("creator", "-password"); // removing the password for extra security
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );

    return next(error);
  }

  if (!place) {
    return new HttpError(
      "Could not find the place for the provided place id",
      404
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

exports.getPlacesByUserId = async (req, res, next) => {
  const uid = req.params.uid;
  // let places;
  let userWithPlaces;

  try {
    userWithPlaces = await User.findById(uid).populate("places"); // returns an array
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the places created by this id, try again later",
      500
    );

    return next(error);
  }
  // if (!places || places.length == 0){
  if (!userWithPlaces || userWithPlaces.length == 0) {
    return next(
      new HttpError("Could not find places for the provided user id", 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map((p) => p.toObject({ getters: true })),
  });
};

// Create a new place
exports.createPlace = async (req, res, next) => {
  console.log("hi i reached the controller");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation Errors:", errors.array());
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    type,
    status,
    city,
    address,
    price,
    bedrooms,
    bathrooms,
    area,
    description,
  } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (err) {
    return next(
      new HttpError("Could not fetch coordinates for the address.", 500)
    );
  }

  console.log(
    "req body: ",
    type,
    status,
    city,
    address,
    price,
    bedrooms,
    bathrooms,
    area,
    description,
    coordinates,
    req.user.id
  );

  console.log("Uploaded Files:", req.files);

  const images = ["image0", "image1", "image2", "image3"].map((img, index) => ({
    imgNo: index + 1,
    imgSrc: req.files[img]?.[0]?.path || "https://via.placeholder.com/150",
  }));

  console.log(images);
  console.log("images handled successfully");

  const createdPlace = new Place({
    type,
    status,
    city,
    address,
    price,
    bedrooms,
    bathrooms,
    area,
    description,
    location: coordinates,
    creator: req.user.id, // Assumes `isLoggedIn` adds `user` to the request
    img: images,
  });

  let user;
  try {
    user = await User.findById(req.user.id);
  } catch (err) {
    return next(
      new HttpError("Creating place failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided ID.", 404));
  }

  console.log("User ID:", req.user.id);

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace);
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.error("Database Transaction Error:", err);
    return next(new HttpError("Creating place failed, please try again.", 500));
  }
  res.status(201).json({ place: createdPlace });
};

// change this function later on
exports.updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError(
      " to patch a req please provide something for the title, address, description",
      422
    );
  }

  const pid = req.params.pid;
  const {
    city,
    type,
    propertyStatus,
    bedrooms,
    bathrooms,
    area,
    address,
    price,
    features,
    description,
    image0,
    image1,
    image2,
    image3,
  } = req.body;

  let featuresList;

  if (features) {
    featuresList = features.split(",").map((f) => f.trim());
  } else {
    featuresList = "No Features Added";
  }

  console.log(features);

  console.log(req.files);
  console.log("normal image0 in req.body");
  console.log(image0);

  let place;

  try {
    place = await Place.findById(pid);
  } catch (err) {
    const error = new HttpError(
      "finding the place failed, please try again later",
      500
    );

    return next(error);
  }

  if (!place) {
    const error = new HttpError("the provided place id does not exist", 500);
    return next(error);
  }

  // if the person trying to edit this place is not the user
  // who created this place, then the action is not allowed
  if (place.creator.toString() !== req.usData.userId) {
    const error = new HttpError("You are not allowed to edit this place", 401);

    return next(error);
  }

  place.city = city;
  place.type = type;
  place.propertyStatus = propertyStatus;
  place.bedrooms = bedrooms;
  place.bathrooms = bathrooms;
  place.area = area;
  place.price = price;
  place.features = featuresList;
  place.description = description;
  place.address = address;
  place.img[0].imgSrc = req.files["image0"]
    ? req.files["image0"][0].path
    : image0;
  place.img[1].imgSrc = req.files["image1"]
    ? req.files["image1"][0].path
    : image1;
  place.img[2].imgSrc = req.files["image2"]
    ? req.files["image2"][0].path
    : image2;
  place.img[3].imgSrc = req.files["image3"]
    ? req.files["image3"][0].path
    : image3;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Updating the place failed, please try again later",
      500
    );

    return next(error);
  }

  res.status(200).json({
    place: place.toObject({ getters: true }),
    message: " Place updated Successfully",
  });
};

exports.deletePlaceById = async (req, res, next) => {
  const pid = req.params.pid;

  let place;

  try {
    place = await Place.findById(pid).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "finding the place to delete failed, please try again later",
      500
    );

    return next(error);
  }

  if (!place) {
    const error = new HttpError("the provided place id does not exist", 500);
    return next(error);
  }

  // if the person trying to delete this place is not the user
  // who created this place, then the action is not allowed
  if (place.creator.id !== req.useData.userId) {
    const error = new HttpError("You are not allowed to edit this place", 401);

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
    const error = new HttpError(
      "deleting the place failed, please try again later",
      500
    );

    return next(error);
  }

  // delete the place here
  const imagePath = place.img[0].imgSrc;

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: " Deleted Place" });
};
