const express = require("express");
const router = express.Router();
const placesController = require("../controllers/places-controllers");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/user/:uid", placesController.getPlacesByUserId);

router.get("/:pid", placesController.getPlaceById);

router.get("/", placesController.getAllPlaces);

router.use(authMiddleware);

router.post(
  "/",
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

module.exports = router;
