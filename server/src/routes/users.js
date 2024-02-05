const express = require("express");
const { registerNewUser, loginUser, changePassword } = require("../controllers/users");

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.patch("/profile", changePassword);
module.exports = router;
