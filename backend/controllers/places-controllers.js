const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const fs = require("fs");
const Place = require("../models/place");
const User = require("../models/users");
const getCoordinates = require("../util/location");
const { capitalize } = require("../util/utils.js");
const { validationResult } = require("express-validator");
const path = require('path');

// Get all places controller
exports.getAllPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.find();
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

// Get place by id controller
exports.getPlaceById = async (req, res, next) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid).populate("creator", "-password");
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

// Get places by user id controller
exports.getPlacesByUserId = async (req, res, next) => {
  const uid = req.params.uid;
  let userWithPlaces;

  try {
    userWithPlaces = await User.findById(uid).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the places created by this id, try again later",
      500
    );
    return next(error);
  }

  if (!userWithPlaces || userWithPlaces.length == 0) {
    return next(
      new HttpError("Could not find places for the provided user id", 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map((p) => p.toObject({ getters: true })),
  });
};

// Create a new place controller
exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation Errors:", errors.array());
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { bedrooms, bathrooms, area, address, price } = req.body;
  let { city, type, status, features, description } = req.body;

  type = capitalize(type);
  status = capitalize(status);
  city = capitalize(city);
  features = capitalize(features);
  description = capitalize(description);

  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (err) {
    return next(
      new HttpError("Could not fetch coordinates for the address.", 500)
    );
  }

  const images = ["image0", "image1", "image2", "image3"].map((img, index) => ({
    imgNo: index + 1,
    imgSrc: req.files[img]?.[0]?.filename || "https://via.placeholder.com/150",
  }));

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
    features,
    description,
    availability: "Available",
    location: coordinates,
    creator: req.user.id,
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

// Update place by place id controller
exports.updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  // debugging purposes
  
  // if (true) {
  //   console.log(errors);
  //   return next(
  //     new HttpError("error is thrown on purpose", 422)
  //   );
  // }

  const pid = req.params.pid;

  const {
    bedrooms,
    bathrooms,
    area,
    address,
    price,
    image0,
    image1,
    image2,
    image3,
  } = req.body;
  let { city, type, status, features, availability, description } = req.body;

  type = capitalize(type);
  status = capitalize(status);
  city = capitalize(city);
  features = capitalize(features);
  description = capitalize(description);
  availability = capitalize(availability);

  let place;
  try {
    place = await Place.findById(pid);
  } catch (err) {
    return next(
      new HttpError("Finding the place failed, please try again later.", 500)
    );
  }

  if (!place) {
    return next(new HttpError("The provided place ID does not exist.", 404));
  }

  if (place.creator.toString() !== req.user.id) {
    return next(new HttpError("You are not allowed to edit this place.", 401));
  }

  place.city = city;
  place.type = type;
  place.status = status;
  place.availability = availability;
  place.bedrooms = bedrooms;
  place.bathrooms = bathrooms;
  place.area = area;
  place.price = price;
  place.features = features;
  place.description = description;
  place.address = address;

  place.img[0].imgSrc = req.files["image0"]
    ? req.files["image0"][0].filename
    : image0 || place.img[0].imgSrc;
  place.img[1].imgSrc = req.files["image1"]
    ? req.files["image1"][0].filename
    : image1 || place.img[1].imgSrc;
  place.img[2].imgSrc = req.files["image2"]
    ? req.files["image2"][0].filename
    : image2 || place.img[2].imgSrc;
  place.img[3].imgSrc = req.files["image3"]
    ? req.files["image3"][0].filename
    : image3 || place.img[3].imgSrc;

  try {
    await place.save();
  } catch (err) {
    return next(
      new HttpError("Updating the place failed, please try again later.", 500)
    );
  }

  res.status(200).json({
    place: place.toObject({ getters: true }),
    message: "Place updated successfully",
  });
};

// Delete place by id controller
exports.deletePlaceById = async (req, res, next) => {
  console.log("request reached controller");

  const pid = req.params.pid;
  console.log("property id: ", pid);

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

  console.log(place);

  if (place.creator.id !== req.user.id) {
    const error = new HttpError(
      "You are not allowed to delete this place",
      401
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
    const error = new HttpError(
      "deleting the place failed, please try again later",
      500
    );

    return next(error);
  }

  // place.img.forEach((image) => {
  //   const imagePath = path.join(__dirname, "uploads", "images", image.imgSrc);
  //   fs.unlink(imagePath, (err) => {
  //     if (err) {
  //       console.error(`Error deleting file ${imagePath}:`, err.message);
  //     } else {
  //       console.log(`Successfully deleted file: ${imagePath}`);
  //     }
  //   });
  // });

  let image1 = place.img[0].imgSrc
  console.log(image1);
  const imagePath = path.join("backend", "controllers", "uploads", "images", image1);
  console.log(imagePath)
  fs.unlink(imagePath, err => {
    console.log('image deletion error: ', err)
  })


  res.status(200).json({ message: " Deleted Place" });
};
