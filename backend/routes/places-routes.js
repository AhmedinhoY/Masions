const express = require("express");
const { check } = require("express-validator");
const placesController = require("../controllers/places-controllers");
const fileUpload = require("../middlewares/file-upload");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

// Public Routes
router.get("/", placesController.getAllPlaces);
router.get("/:pid", placesController.getPlaceById);
router.get("/user/:uid", placesController.getPlacesByUserId);

// Protect the following routes with authentication
router.use(isLoggedIn);

// Add a new property route
router.post(
  "/add-property",
  fileUpload.fields([
    { name: "image0", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  [
    check("type").trim().notEmpty(),
    check("city").trim().notEmpty(),
    check("address").trim().notEmpty(),
    check("price").isNumeric(),
    check("bedrooms").isNumeric(),
    check("bathrooms").isNumeric(),
    check("area").isNumeric(),
    check("description").isLength({ min: 5 }),
  ],
  placesController.createPlace
);

// Update a property route
router.patch(
  "/:pid",
  fileUpload.fields([
    { name: "image0", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  [
    check("type").trim().notEmpty(),
    check("city").trim().notEmpty(),
    check("address").trim().notEmpty(),
    check("price").isNumeric(),
    check("bedrooms").isNumeric(),
    check("bathrooms").isNumeric(),
    check("area").isNumeric(),
    check("description"),
  ],
  placesController.updatePlaceById
);

// Delete a property route
router.delete("/delete-property/:pid", placesController.deletePlaceById);

module.exports = router;
