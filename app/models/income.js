const mongoose = require('mongoose')
const validator = require('validator')

const topicSchema = new mongoose.Schema(
    {
        Title: String,
        Amount: Number,
        Type: String,
        Date: String,
        TimeStamp: Number,
        Description: String,
        AccType: { type: String, default: "" },
        User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('incomes', topicSchema)
