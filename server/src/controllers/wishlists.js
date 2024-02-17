const Wishlist = require("../models/wishlist");

// add product to the cart
const addWishlist = async (req, res) => {
  try {
    // check if the user cart is alreay exist or not
    const existingUserWishlist = await Wishlist.findOne({ userId: req.body.userId });
    if (existingUserWishlist) {
      existingUserWishlist.wishlistItems.push({
        category: req.body.wishlist.category,
        product: req.body.wishlist.product,
      });
      await existingUserWishlist.save(); // if exist then push cart item to the existing list
    } else {
      await Wishlist.create({
        // if not then create new cart store for new user
        userId: req.body.userId,
        wishlistItems: [
          {
            category: req.body.wishlist.category,
            product: req.body.wishlist.product,
          },
        ],
      });
    }
    res.json({ msg: "Wishlist added successfully!" });
  } catch (err) {
    console.log(err);
  }
};

//get cartlist
const getWishlistItems = async (req, res) => {
  try {
    const existingUserWishlist = await Wishlist.findOne({ userId: req.query.userId });
    if (existingUserWishlist) {
      const wishlists = existingUserWishlist.wishlistItems;
      res.json(wishlists);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addWishlist, getWishlistItems };
