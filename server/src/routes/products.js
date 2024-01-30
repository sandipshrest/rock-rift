const express = require("express");
const {addProduct, getAllProducts} = require("../controllers/products");

const router = express.Router();
router.post("/admin/products", addProduct);
router.get("/admin/products", getAllProducts);
module.exports = router;
