const { matchedData } = require('express-validator')

const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const {
  emailExists
} = require('../../middleware/emailer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
    const doesEmailExists = await emailExists(req.Email)
    if (!doesEmailExists) {
      const item = await registerUser(req)
      const userInfo = await setUserInfo(item)
      // sendRegistrationEmailMessage(locale, item)
      res.status(200).json({
        success: true,
        result: null,
        message: "Register Successfully"
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
