const express = require("express");
const { addCategory, getAllCategory } = require("../controllers/categories");

const router = express.Router();
router.post("/categories", addCategory);
router.get("/categories", getAllCategory);

module.exports = router;
