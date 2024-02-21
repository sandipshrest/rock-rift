const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  productId: String,
  feedbacks: [
    {
      userName: String,
      userEmail: String,
      message: String,
    },
  ],
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
