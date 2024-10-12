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
const updateWebsiteDatas = async (req, res) => {
    try {
        const data = matchedData(req)
        var hashpass = await encrypt(data.password)
        delete data.password
        await addDatas.findOneAndUpdate(
            { _id: data.id },
            {
                website: data.website,
                username: data.username,
                password: hashpass
            })
        res.status(200).json({
            success: true,
            result: null,
            message: 'Datas Updated Successfully'
        })
    } catch (error) {
        handleError(res, error)
    }

}
module.exports = { updateWebsiteDatas }
