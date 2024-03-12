const express = require("express");
const {
  addWishlist,
  getWishlistItems,
  deleteWishlistById,
} = require("../controllers/wishlists");

const router = express.Router();
router.post("/wishlists", addWishlist);
router.get("/wishlists", getWishlistItems);
router.delete("/wishlist/:userId", deleteWishlistById);

module.exports = router;
