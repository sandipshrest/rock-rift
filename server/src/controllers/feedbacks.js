const Feedback = require("../models/feedback");

// add feedback
const addFeedback = async (req, res) => {
  try {
    const existingProductFeedback = await Feedback.findOne({
      productId: req.params.productId,
    });
    if (existingProductFeedback) {
      existingProductFeedback.feedbacks.push(req.body);
      await existingProductFeedback.save(); // if exist then push cart item to the existing list
    } else {
      await Feedback.create({
        // if not then create new cart store for new user
        productId: req.params.productId,
        feedbacks: [req.body],
      });
    }
    res.json({ msg: "Feedback submit successfullly!" });
  } catch (err) {
    console.log(err);
  }
};

// get feedback
const getFeedbacksByProductId = async (req, res) => {
  try {
    const existingProductFeedback = await Feedback.findOne({
      productId: req.params.productId,
    });
    if (existingProductFeedback) {
      const feedbackList = existingProductFeedback.feedbacks;
      res.json(feedbackList);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addFeedback, getFeedbacksByProductId };
