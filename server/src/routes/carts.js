const express = require("express");
const { addCart, getCartItems, deleteCartById } = require("../controllers/carts");

const router = express.Router();
router.post("/carts", addCart);
router.get("/carts", getCartItems);
router.delete("/cart/:userId", deleteCartById);


module.exports = router;
