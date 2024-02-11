const express = require("express");
const { addCart, getCartItems } = require("../controllers/carts");

const router = express.Router();
router.post("/carts", addCart);
router.get("/carts", getCartItems);

module.exports = router;
