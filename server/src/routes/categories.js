const express = require("express");
const { addCategory, getAllCategory } = require("../controllers/categories");

const router = express.Router();
router.post("/admin/categories", addCategory);
router.get("/admin/categories", getAllCategory);

module.exports = router;
