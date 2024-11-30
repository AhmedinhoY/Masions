const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  logout,
  getAllUsers,
  updateToSeller,
} = require("../controllers/users-controllers");
const { check } = require("express-validator");
const isLoggedIn = require("../middlewares/isLoggedIn");
const fileUpload = require("../middlewares/file-upload");

router.get("/", getAllUsers);

router.post(
  "/signup",
  [
    check("email").notEmpty().normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signUp
);

router.post("/login", login);
router.post("/logout", isLoggedIn, logout);

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
