const mongoose = require("mongoose");
const { Schema } = mongoose;

// define shape of the User documents in the collection
const userSchema = new Schema({
  name: String,
  contact: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
