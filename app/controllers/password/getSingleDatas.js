/* eslint-disable max-statements */
const { handleError } = require('../../middleware/utils')
const passwords = require('../../models/passwords')
const { decrypt } = require('../../middleware/auth')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getSingleDatas = async (req, res) => {
    try {
        if (req.body.id) {
            const datas = await passwords.findOne({ user_id: req.user._id, _id: req.body.id })
            if (datas) {
                var objs = {
                    website: datas.website,
                    username: datas.username,
                    password: await decrypt(datas.password)
                }
                res.status(200).json({
                    success: true,
                    result: objs?.password,
                    message: 'datas'
                })
            } else {
                res.status(200).json({
                    success: false,
                    result: "",
                    message: 'Data Not Found'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                result: "",
                message: 'Please Enter ID'
            })
        }
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { getSingleDatas }
