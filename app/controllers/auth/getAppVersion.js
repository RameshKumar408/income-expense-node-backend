/* eslint-disable max-statements */
const Versions = require('../../models/appversion')
const { handleError } = require('../../middleware/utils')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAppVersion = async (req, res) => {
    try {
        const topics = await Versions.findOne({});
        res.status(200).json({
            topics
        })
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { getAppVersion }
