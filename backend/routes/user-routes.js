const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  logout,
  getAllUsers,
  updateToSeller,
  getAllUsersForMessages,
} = require("../controllers/users-controllers");
const { check } = require("express-validator");
const isLoggedIn = require("../middlewares/isLoggedIn");
const fileUpload = require("../middlewares/file-upload");

router.get("/", getAllUsers);
router.get("/getUsersForMessages", isLoggedIn, getAllUsersForMessages);

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/updateToSeller/:id", fileUpload.single("image"), updateToSeller);

router.get("/isLoggedIn", isLoggedIn, (req, res) => {
  if (req.user) {
    return res.status(200).json({
      isLoggedIn: true,
      user: req.user,
      token: req.token,
    });
  }
  res.status(200).json({
    isLoggedIn: false,
  });
});

module.exports = router;
