const mongoose = require('mongoose')
const validator = require('validator')

const passSchema = new mongoose.Schema(
    {
        website: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = mongoose.model('webdatas', passSchema)
