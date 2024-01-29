const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  category: String,
  subCategory: Array,
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
