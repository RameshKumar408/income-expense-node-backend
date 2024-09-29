const { matchedData } = require('express-validator')

const {
  findUser,
  userIsBlocked,
  checkLoginAttemptsAndBlockExpires,
  passwordsDoNotMatch,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken
} = require('./helpers')

const { handleError } = require('../../middleware/utils')
const { checkPassword } = require('../../middleware/auth')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUser(data.Email)
    if (user?.code != 404) {
      await userIsBlocked(user)
      await checkLoginAttemptsAndBlockExpires(user)
      const isPasswordMatch = await checkPassword(data.Password, user)
      console.log("🚀 ~ login ~ isPasswordMatch:", isPasswordMatch)
      if (!isPasswordMatch) {
        // handleError(res, await passwordsDoNotMatch(user))
        const datas = await passwordsDoNotMatch(user)
        res.status(400).json({
          status: false,
          password: "Wrong Password"
        })
      } else {
        // all ok, register access and return token
        user.loginAttempts = 0
        await saveLoginAttemptsToDB(user)
        const response = await saveUserAccessAndReturnToken(req, user)
        res.status(200).json({
          status: true,
          result: response?.token,
          message: "Login Successfully"
        })
      }
    } else {
      res.status(400).json({
        email: "Email Not Exist", status: false
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
