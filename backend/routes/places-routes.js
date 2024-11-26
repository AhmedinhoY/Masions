const express = require("express");
const router = express.Router();
const placesController = require("../controllers/places-controllers");
const { check } = require("express-validator");
const fileUpload = require("../middlewares/file-upload");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/user/:uid", placesController.getPlacesByUserId);

router.get("/:pid", placesController.getPlaceById);

router.get("/", placesController.getAllPlaces);

// requests goes through this script from top to bottom
// therefore anything under this middleware will require
// a token before it can be used ... Hence routes are protected now!
router.use(isLoggedIn);

router.post(
  "/",
  // git version control video

  fileUpload.fields([
    { name: "image0", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),

  [
    check("city").notEmpty(),
    check("type").trim().notEmpty(),
    check("bedrooms").notEmpty(),
    check("bathrooms").notEmpty(),
    check("area").notEmpty(),
    check("price").notEmpty(),
    check("propertyStatus").trim().notEmpty(),
    check("description").notEmpty().isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  "/:pid",

  fileUpload.fields([
    { name: "image0", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),

  [
    check("city").notEmpty(),
    check("type").trim().notEmpty(),
    check("propertyStatus").trim().notEmpty(),
    check("bedrooms").notEmpty(),
    check("bathrooms").notEmpty(),
    check("area").notEmpty(),
    check("price").notEmpty(),
    check("description").notEmpty().isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  placesController.updatePlaceById
);

router.delete("/:pid", placesController.deletePlaceById);

router.delete("/:pid", placesController.deletePlaceById);

module.exports = router;
