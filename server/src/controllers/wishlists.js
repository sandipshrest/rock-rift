const Wishlist = require("../models/wishlist");

// add product to the cart
const addWishlist = async (req, res) => {
  try {
    await Wishlist.create({
      category: req.body.category,
      product: req.body.product,
    });
    res.json({msg: 'Wishlist added successfully!'})
  } catch (err) {
    console.log(err);
  }
};

//get cartlist
const getWishlistItems = async (req, res) => {
  try {
    const wishlistList = await Wishlist.find();
    res.json(wishlistList);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addWishlist, getWishlistItems };
