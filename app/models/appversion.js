const mongoose = require('mongoose')
const validator = require('validator')

const appversionSchema = new mongoose.Schema(
    {
        Version: String,
        link: String
    },

    {
        timestamps: true,
    }
)
module.exports = mongoose.model('appversions', appversionSchema)
