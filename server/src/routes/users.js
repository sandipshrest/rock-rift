const express = require("express");
const {
  registerNewUser,
  loginUser,
  addCategory,
} = require("../controllers/users");

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.post("/admin/categories", addCategory);
module.exports = router;
