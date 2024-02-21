const express = require("express");
const { addFeedback } = require("../controllers/feedbacks");

const router = express.Router();
router.post("/feedback/:productId", addFeedback);

module.exports = router;
