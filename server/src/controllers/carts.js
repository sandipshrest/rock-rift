const Cart = require("../models/cart");

// add product to the cart
const addCart = async (req, res) => {
  try {
    // check if the user cart is alreay exist or not
    const existingUserCart = await Cart.findOne({ userId: req.body.userId });
    if (existingUserCart) {
      existingUserCart.cartItems.push({
        category: req.body.cart.category,
        product: req.body.cart.product,
      });
      await existingUserCart.save(); // if exist then push cart item to the existing list
    } else {
      await Cart.create({
        // if not then create new cart store for new user
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
    const existingUserCart = await Cart.findOne({ userId: req.query.userId });
    if (existingUserCart) {
      const cartList = existingUserCart.cartItems;
      res.json(cartList);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addCart, getCartItems };
