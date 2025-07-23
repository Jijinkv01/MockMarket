const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
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
  orderType: {
    type: String,
    enum: ["market", "limit"],
    required: true,
  },
  orderSide: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: function () {
      return this.orderType === "limit";
    },
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "executed", "cancelled"],
    default: function () {
      return this.orderType === "market" ? "executed" : "pending";
    },
  },

}, { timestamps: true })

const Order = mongoose.model("order", orderSchema)

module.exports = Order
