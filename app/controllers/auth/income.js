/* eslint-disable max-statements */
const { matchedData } = require('express-validator')
const incomes = require('../../models/income')
const { handleError } = require('../../middleware/utils')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const income = async (req, res) => {
    try {
        const data = await matchedData(req)
        data.User_id = req.user._id
        const response = await incomes.create(data)
        res.status(200).json({
            message: "Topic Created", status: true
        })
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { income }
