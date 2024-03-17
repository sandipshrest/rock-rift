const Product = require("../models/product");

// add prodctCategory
const addProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const existingProduct = await Product.findOne({
      product: req.body.product,
    });
    if (existingProduct) {
      return res.status(403).json({ msg: "Product already added." });
    } else {
      // req.body.productImage = req.file.filename;
      await Product.create(req.body);
      res.status(201).json({ msg: "Product added successfully!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed to add product." });
  }
};

//fetch products
const getAllProducts = async (req, res) => {
  try {
    if (!req.query.page) {
      const products = await Product.find();
      return res.json(products);
    } else {
      const count = await Product.find().count();
      const skipCount = 10 * (req.query.page - 1);
      const productList = await Product.find().limit(10).skip(skipCount);
      return res.json({ productList, count });
    }
  } catch (err) {
    console.log(err);
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const getFeatureProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (err) {
    console.log(err);
  }
};

const getProductDetailById = async (req, res) => {
  try {
    const productDetail = await Product.findById({ _id: req.params.id });
    res.json(productDetail);
  } catch (err) {
    console.log(err);
  }
};

const getSearchProduct = async (req, res) => {
  try {
    const searchedProducts = await Product.find({
      product: { $regex: req.query.productName, $options: "i" },
    });
    res.json(searchedProducts);
  } catch (err) {
    console.log(err);
  }
};

const deleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndDelete({ _id: req.params.id });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getFeatureProducts,
  getProductDetailById,
  getSearchProduct,
  getProductByCategory,
  deleteProductById,
};
