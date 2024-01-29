const Product = require("../models/product");

// add prodctCategory
const addProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({
      product: req.body.product,
    });
    if (existingProduct) {
      return res.status(403).json({ msg: "Product already added." });
    } else {
      await Product.create(req.body);
      res.status(201).json({ msg: "Product added successfully!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed to add product." });
  }
};

module.exports = addProduct;
