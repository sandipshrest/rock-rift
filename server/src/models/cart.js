const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: String,
  cartItems: [
    {
      category: String,
      product: String,
      price: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
