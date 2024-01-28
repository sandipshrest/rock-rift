const { User, Category } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// register new user
const registerNewUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ msg: "User already exists." });
    } else {
      const hashPassword = {
        password: await bcrypt.hash(req.body.password, saltRounds),
        rePassword: await bcrypt.hash(req.body.rePassword, saltRounds),
      };
      req.body = { ...req.body, ...hashPassword };
      await User.create(req.body);
      res.status(201).json({ msg: "registered successfully!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Registration failed" });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const userDetail = await User.findOne({ email: req.body.email });
    if (userDetail) {
      const matched = await bcrypt.compare(
        req.body.password,
        userDetail.password
      );
      if (matched) {
        const token = jwt.sign(
          { email: userDetail.email },
          process?.env.SECRET_KEY
        );
        return res
          .status(201)
          .json({ msg: "Login Successfully", token, userDetail });
      } else {
        return res.status(403).json({ msg: "Password didn't match" });
      }
    } else {
      return res.status(401).json({ msg: "Email not found" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Login failed" });
  }
};

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

module.exports = { registerNewUser, loginUser, addCategory };
