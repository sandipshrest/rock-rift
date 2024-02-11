const express = require("express");
const { addWishlist, getWishlistItems } = require("../controllers/wishlists");

const router = express.Router();
router.post("/wishlists", addWishlist);
router.get("/wishlists", getWishlistItems);

module.exports = router;
