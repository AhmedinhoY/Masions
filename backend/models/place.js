const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  img: [
    {
      imgNo: { type: Number }, //optional
      imgSrc: { type: String },
    },
  ],

  city: { type: String, required: true },

  type: { type: String, required: true },

  status: { type: String, required: true },

  bedrooms: { type: Number, required: true },

  bathrooms: { type: Number, required: true },

  area: { type: Number, required: true },

  price: { type: Number, required: true },

  features: {
    type: [String], //array of strings
    required: true,
  },

  description: { type: String, required: true },

  address: { type: String, required: true },

  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },

  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Place", placeSchema);

// required = true
// The required option in Mongoose is a schema validation rule that enforces
// the presence of a particular field when creating or updating a document.
