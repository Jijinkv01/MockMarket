const mongoose = require("mongoose")

const demoCashSchema = mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true, 
  },
  balance: {
        type:Number,
        default: 100000
    }
}, { timestamps: true })

const DemoCash = mongoose.model("demoCash",demoCashSchema)
module.exports = DemoCash