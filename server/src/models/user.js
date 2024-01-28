const mongoose = require("mongoose");
const { Schema } = mongoose;

// define shape of the User documents in the collection
const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  rePassword: String,
});

const categorySchema = new Schema({
  category: String,
  subCategory: Array,
});

const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);
module.exports = { User, Category };
