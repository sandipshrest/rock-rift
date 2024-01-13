const express = require("express");
const router = express.Router();

const { registerNewUser } = require("../controllers/users");

router.post("/register", registerNewUser);
module.exports = router;
