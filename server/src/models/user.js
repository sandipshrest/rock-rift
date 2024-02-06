const mongoose = require("mongoose");
const { Schema } = mongoose;

// define shape of the User documents in the collection
const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
