const { validateForgotPassword } = require('./validateForgotPassword')
const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const { validateResetPassword } = require('./validateResetPassword')
const { adminvalidateLogin } = require('./adminvalidatelogin')
const { validateIncome } = require('./validateIncome')

module.exports = {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  adminvalidateLogin,
  validateIncome
}
