const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    // type: String,
    // default: "https://ibb.co/0t3gtwT",
    // set: (v) => (v === "" ? "https://ibb.co/0t3gtwT" : v),
    filename: {
      type: String,
      required: true,
      default: "listingimage",
    },
    url: {
      type: String,
      required: true,
      default: "https://ibb.co/0t3gtwT",
      set: (v) => (v === "" ? "https://ibb.co/0t3gtwT" : v),
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
