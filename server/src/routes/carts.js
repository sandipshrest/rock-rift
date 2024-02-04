const express = require("express");
const { addCart, getCartItems } = require("../controllers/carts");

const router = express.Router();
router.post("/", addCart);
router.get("/", getCartItems);

module.exports = router;
