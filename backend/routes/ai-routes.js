const express = require("express");
const aiController = require('../controllers/ai-controller');
const router = express.Router();


router.post('/predict', aiController.predictPrice)


module.exports = router;