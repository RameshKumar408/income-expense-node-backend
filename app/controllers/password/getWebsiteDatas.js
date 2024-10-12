/* eslint-disable max-statements */
const { handleError } = require('../../middleware/utils')
const passwords = require('../../models/passwords')
const { decrypt } = require('../../middleware/auth')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getWebsiteDatas = async (req, res) => {
    try {
        const datas = await passwords.find({ user_id: req.user._id })

        if (datas?.length > 0) {
            // var datass = []
            // for (let i = 0; i < datas.length; i++) {
            //     const element = datas[i];
            //     var objs = {
            //         website: element.website,
            //         username: element.username,
            //         password: await decrypt(element.password)
            //     }
            //     datass.push(objs)
            // }
            res.status(200).json({
                success: true,
                result: datas,
                message: 'worked'
            })
        } else {
            res.status(200).json({
                success: true,
                result: datas,
                message: 'worked'
            })
        }

    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { getWebsiteDatas }
