const express = require("express");
const wishlistController = require("../controllers/wishlist-controllers");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.use(isLoggedIn);

router.post("/add-to-wishlist", wishlistController.addToWishlist);
router.get("/get-wishlist/:id", wishlistController.getWishlist);
router.post("/remove-from-wishlist", wishlistController.removeFromWishlist);

module.exports = router;
