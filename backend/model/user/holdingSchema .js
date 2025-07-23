const mongoose = require("mongoose")


const holdingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  avgPrice: {
    type: Number, // weighted average price
    required: true,
  }
}, { timestamps: true });

const Holding = mongoose.model("Holding", holdingSchema);
module.exports = Holding;
