const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  image: { type: String, required: false },
  cpr: { type: Number, required: false },
  agency: { type: String, required: false },
  places: [{ type: mongoose.Types.ObjectId, required: false, ref: "Place" }],
  roles: {
    type: String,
    required: false,
    default: "buyer",
  },
});

module.exports = mongoose.model("User", userSchema);
