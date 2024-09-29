/* eslint-disable max-statements */
const { matchedData } = require('express-validator')
const Income = require('../../models/income')
const { handleError } = require('../../middleware/utils')
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const editIncome = async (req, res) => {
    try {
        const data = await matchedData(req)
        // const { Id, Title, Amount, Type, Date, TimeStamp, Description } = req.body;
        var Id = data.Id
        delete data.Id
        await Income.findOneAndUpdate({ _id: Id, User_id: req.user._id }, data);
        // return NextResponse.json({ message: "Updated Successfully", status: true }, { status: 200 });
        res.status(200).json({
            message: "Updated Successfully", status: true
        })
    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { editIncome }
