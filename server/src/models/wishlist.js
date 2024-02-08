const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  category: String,
  product: String,
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
