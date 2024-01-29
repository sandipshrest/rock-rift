const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  product: String,
  category: String,
  subCategory: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
