/* eslint-disable max-statements */
const { handleError } = require('../../middleware/utils')
const addDatas = require('../../models/passwords')
const { encrypt } = require('../../middleware/auth')
const { matchedData } = require('express-validator')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const searchWebsiteDatas = async (req, res) => {
    try {
        if (req.body.search) {
            var datasss = await addDatas.find(
                {
                    website: { $regex: req.body.search, $options: 'i' },
                    user_id: req.user._id
                }
            )
            res.status(200).json({
                success: true,
                result: datasss,
                message: 'Data find Successfully'
            })
        } else {
            res.status(200).json({
                success: false,
                result: null,
                message: 'Please Enter Search Keyword'
            })
        }

    } catch (error) {
        handleError(res, error)
    }

}
module.exports = { searchWebsiteDatas }
