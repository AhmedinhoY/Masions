const express = require("express");
const messageControllers = require("../controllers/message-controllers");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.use(isLoggedIn);
router.post("/send/:id", messageControllers.sendMessage);
router.get("/:id", messageControllers.getMessages);

module.exports = router;
