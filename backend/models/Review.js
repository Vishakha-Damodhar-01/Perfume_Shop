const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  username: String,
  rating: Number,
  comment: String,
});

module.exports = mongoose.model("Review", reviewSchema);
