/* eslint-disable max-statements */
const { matchedData } = require('express-validator')
const Income = require('../../models/income')
const { handleError } = require('../../middleware/utils')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteIncome = async (req, res) => {
    try {
        var id = req.query.id
        console.log("🚀 ~ deleteIncome ~ id:", id)
        var search = await Income.findOne({ _id: id, User_id: req.user._id })
        if (search) {
            await Income.findOneAndDelete({ _id: id, User_id: req.user._id });
            res.status(200).json({
                message: "Topic deleted", status: true
            })
        } else {
            res.status(400).json({
                message: "Data Not Found", status: false
            })
        }
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { deleteIncome }
