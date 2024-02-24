const express = require("express");
const { addFeedback, getFeedbacksByProductId } = require("../controllers/feedbacks");

const router = express.Router();
router.post("/feedback/:productId", addFeedback);
router.get("/feedback/:productId", getFeedbacksByProductId);

module.exports = router;
