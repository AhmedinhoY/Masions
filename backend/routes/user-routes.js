const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users-controllers');
const { check } = require('express-validator');

router.get('/', usersControllers.getAllUsers);

router.post('/signup', [
  check('name').notEmpty(),
  check('email')
    .notEmpty()
    .normalizeEmail()
    .isEmail(),
  check('password')
    .isLength({ min: 3 })
], usersControllers.signUp);

router.post('/login', usersControllers.login);





module.exports = router;