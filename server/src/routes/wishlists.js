const express = require("express");
const { addWishlist, getWishlistItems } = require("../controllers/wishlists");

const router = express.Router();
router.post("/", addWishlist);
router.get("/", getWishlistItems);

module.exports = router;
