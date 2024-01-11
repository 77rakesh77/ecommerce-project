const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eligibleProductIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    }
  ],
  discountAmount: {
    type: Number,
    default: 1, // Set to 1 for "Buy 1, Pay for 1"
    required: true
  }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
