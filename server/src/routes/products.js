const express = require("express");
const {
  addProduct,
  getAllProducts,
  getFeatureProducts,
  getProductDetailById,
} = require("../controllers/products");

const router = express.Router();
router.post("/products", addProduct);
router.get("/products", getAllProducts);
router.get("/featured", getFeatureProducts);
router.get("/products/:id", getProductDetailById);
module.exports = router;
