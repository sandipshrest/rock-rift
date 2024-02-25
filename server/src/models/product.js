const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  product: String,
  category: String,
  subCategory: String,
  price: Number,
  isFeatured: Boolean,
  productImages: [String],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
