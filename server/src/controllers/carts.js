const Cart = require("../models/cart");

// add product to the cart
const addCart = async (req, res) => {
  try {
    await Cart.create({
      category: req.body.category,
      product: req.body.product,
    });
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
