const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductDetailById,
} = require("../controllers/products");

const router = express.Router();
router.post("/products", addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductDetailById);
module.exports = router;
