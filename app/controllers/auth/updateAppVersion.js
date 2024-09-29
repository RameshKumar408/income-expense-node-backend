/* eslint-disable max-statements */
const { matchedData } = require('express-validator')
const Versions = require('../../models/appversion')
const { handleError } = require('../../middleware/utils')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateAppVersion = async (req, res) => {
    try {
        const { Version, link } = req.body;
        if (!Version) {
            res.status(400).json({
                message: "Please Enter Version", status: false
            })
        } else if (!link) {
            res.status(400).json({
                message: "Please Enter link", status: false
            })
        } else {
            const topics = await Versions.findOne({});
            if (topics) {
                var logs = { Version: Version, link: link }
                await Versions.findOneAndUpdate({ _id: topics._id }, logs);
                res.status(200).json({
                    message: "Version Updated", status: true
                })
            } else {
                var datas = await Versions.create({ Version: Version, link: link });
                res.status(200).json({
                    message: "Version Created", result: datas, status: true
                })
            }
        }
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { updateAppVersion }
