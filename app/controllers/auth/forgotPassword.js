/* eslint-disable max-statements */
const User = require('../../models/user')
const { handleError } = require('../../middleware/utils')
const bcrypt = require('bcrypt');
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            res.status(400).json({
                message: "Please Enter email", status: false
            })
        } else if (!password) {
            res.status(400).json({
                message: "Please Enter password", status: false
            })
        } else {
            const Users = await User.findOne({ Email: email });
            if (Users) {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);

                // Hash the password
                const hashedPassword = bcrypt.hashSync(password, salt);
                var logs = { Password: hashedPassword }
                await User.findOneAndUpdate({ _id: Users._id }, logs);
                res.status(200).json({
                    message: "Updated Successfully", status: true
                })
            } else {
                res.status(400).json({
                    message: "User Not Found", status: false
                })
            }
        }

    } catch (error) {
        handleError(res, error)
    }
}
module.exports = { forgotPassword }
