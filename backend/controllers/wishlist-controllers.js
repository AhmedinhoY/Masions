const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const Wishlist = require("../models/wishlist");
const Place = require("../models/place");
const User = require("../models/users");
const { validationResult } = require("express-validator");

exports.addToWishlist = async (req, res, next) => {
  const { userId, propertyId } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation Errors:", errors.array());
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let user, place, wishlist;
  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("Could not find user for provided ID.", 404));
    }

    place = await Place.findById(propertyId);
    if (!place) {
      return next(new HttpError("Could not find place for provided ID.", 404));
    }

    wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      // Create a new wishlist if it doesn't exist
      wishlist = new Wishlist({ userId, places: [propertyId] });
    } else {
      // Add the property to the existing wishlist if not already present
      if (!wishlist.places.includes(propertyId)) {
        wishlist.places.push(propertyId);
      } else {
        return next(new HttpError("Property is already in the wishlist.", 400));
      }
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    await wishlist.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: "Property added to wishlist.", wishlist });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return next(
      new HttpError("Adding to wishlist failed, please try again.", 500)
    );
  }
};

exports.getWishlist = async (req, res, next) => {
  const { id } = req.params.id;

  let wishlist;
  try {
    // Find the wishlist for the user and populate the places with their details
    wishlist = await Wishlist.findOne({ id }).populate("places", id);
  } catch (err) {
    console.error("Database Error:", err);
    return next(
      new HttpError("Fetching wishlist failed, please try again later.", 500)
    );
  }

  if (!wishlist) {
    return next(
      new HttpError("Could not find wishlist for the provided user ID.", 404)
    );
  }

  res.status(200).json({ wishlist });
};

exports.removeFromWishlist = async (req, res, next) => {
  const { userId, propertyId } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation Errors:", errors.array());
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let wishlist;
  try {
    // Find the wishlist for the user
    wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return next(
        new HttpError("Wishlist not found for the provided user ID.", 404)
      );
    }

    // Check if the property is in the wishlist
    const propertyIndex = wishlist.places.indexOf(propertyId);
    if (propertyIndex === -1) {
      return next(new HttpError("Property not found in the wishlist.", 404));
    }

    // Remove the property from the wishlist
    wishlist.places.splice(propertyIndex, 1);

    const session = await mongoose.startSession();
    session.startTransaction();
    await wishlist.save({ session });
    await session.commitTransaction();

    res
      .status(200)
      .json({ message: "Property removed from wishlist.", wishlist });
  } catch (err) {
    console.error("Error removing property from wishlist:", err);
    return next(
      new HttpError(
        "Removing property from wishlist failed, please try again.",
        500
      )
    );
  }
};
