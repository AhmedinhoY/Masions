const express = require('express');
const router = express.Router();
const placesController = require('../controllers/places-controllers');
const { check } = require('express-validator');

router.get('/user/:uid', placesController.getPlacesByUserId);

router.get('/:pid', placesController.getPlaceById);

router.get('/', placesController.getAllPlaces);

router.post('/', [
  check('title').notEmpty(),
  check('description').notEmpty().isLength({ min: 5 }),
  check('address').notEmpty(),
], placesController.createPlace);

router.patch('/:pid', [
  check('title').notEmpty(),
  check('description').notEmpty().isLength({ min: 5 }),
], placesController.updatePlaceById);

router.delete('/:pid', placesController.deletePlaceById);





module.exports = router;