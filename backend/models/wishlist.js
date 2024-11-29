const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
