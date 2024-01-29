const Category = require("../models/category");

// add prodctCategory
const addCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      category: req.body.category,
    });
    if (existingCategory) {
      return res.status(403).json({ msg: "Category already added." });
    } else {
      await Category.create(req.body);
      res.status(201).json({ msg: "Category added successfully!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed to add product category." });
  }
};

//get category
const getAllCategory = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

module.exports = { addCategory, getAllCategory };
