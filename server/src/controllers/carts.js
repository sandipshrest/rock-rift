const Cart = require("../models/cart");

// add product to the cart
const addCart = async (req, res) => {
  try {
    const existingUserCart = await Cart.findOne({ userId: req.body.userId });
    if (existingUserCart) {
      existingUserCart.cartItems.push({
        category: req.body.cart.category,
        product: req.body.cart.product,
      });
      await existingUserCart.save();
    } else {
      await Cart.create({
        userId: req.body.userId,
        cartItems: [
          {
            category: req.body.cart.category,
            product: req.body.cart.product,
          },
        ],
      });
    }
    res.json({ msg: "Cart added successfully!" });
  } catch (err) {
    console.log(err);
  }
};

//get cartlist
const getCartItems = async (req, res) => {
  try {
    const cartList = await Cart.find();
    res.json(cartList);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addCart, getCartItems };
