const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: String,
  cartItems: [
    {
      category: String,
      product: String,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
