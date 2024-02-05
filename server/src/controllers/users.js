const User = require("../models/user");
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

// login user
const changePassword = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const matchedPassword = await bcrypt.compare(
        req.body.oldPassword,
        existingUser.password
      );
      if (matchedPassword) {
        const hashNewPassword = {
          password: await bcrypt.hash(req.body.newPassword, saltRounds),
          rePassword: await bcrypt.hash(req.body.confirmPassword, saltRounds),
        };
        req.body = { ...req.body, ...hashNewPassword };
        await User.replaceOne(req.body);
        return res.status(201).json({ msg: "Password change successfully!" });
        // const token = jwt.sign(
        //   { email: userDetail.email },
        //   process?.env.SECRET_KEY
        // );
      } else {
        return res.status(403).json({ msg: "Password didn't match" });
      }
    } else {
      return res.status(401).json({ msg: "Email did not match" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Fail to change password" });
  }
};

module.exports = { registerNewUser, loginUser, changePassword };
