/* eslint-disable max-statements */
const { matchedData } = require('express-validator')
const Income = require('../../models/income')
const { handleError } = require('../../middleware/utils')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const importDatas = async (req, res) => {
    try {
        const datas = req.body
        if (datas?.length == 0) {
            res.status(400).json({
                message: "Please Enter Data", status: false
            })
        } else {
            for (let i = 0; i < datas?.length; i++) {
                const element = datas[i];
                var already = await Income.findOne({ TimeStamp: element?.TimeStamp, Title: element?.Title, User_id: req.user._id, Amount: element?.Amount, Type: element?.Type });
                if (already) {
                    continue;
                } else {
                    const { Title, Description, Amount, Type, Date, TimeStamp } = element;
                    await Income.create({ Title, Amount, Type, Date, TimeStamp, User_id: req.user._id, Description });
                }
            }
            res.status(200).json({
                message: "Uploaded Successfully", status: true
            })
        }
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { importDatas }
