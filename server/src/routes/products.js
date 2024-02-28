const express = require("express");
const {
  addProduct,
  getAllProducts,
  getFeatureProducts,
  getProductDetailById,
  getSearchProduct,
} = require("../controllers/products");

const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/productImages");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/products", upload.array("productImages"), addProduct);
router.get("/products", getAllProducts);
router.get("/featured", getFeatureProducts);
router.get("/products/:id", getProductDetailById);
router.get("/search", getSearchProduct);
module.exports = router;
