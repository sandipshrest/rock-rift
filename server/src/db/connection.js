const mongoose = require("mongoose");
const connection = async () => {
  try {
    const res = await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDb");
    if (res) {
      console.log("Mongodb connected successfully");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = connection;
