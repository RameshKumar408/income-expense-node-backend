const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  register,
  getRefreshToken,
  login,
  loginByAdmin,
  roleAuthorization,
  profile,
  profileUpdate,
  income,
  getDateRangeIncomes,
  editIncome,
  deleteIncome,
  updateAppVersion,
  getAppVersion,
  forgotPassword,
  importDatas
} = require('../controllers/auth')

const {
  validateRegister,
  validateLogin,
  adminvalidateLogin,
  validateprofile,
  validateIncome
} = require('../controllers/auth/validators')

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post('/register', trimRequest.all, validateRegister, register)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  getRefreshToken
)

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

router.post('/incomes',
  trimRequest.all,
  validateIncome,
  requireAuth,
  roleAuthorization(['user']),
  income)

router.put('/getelementid',
  trimRequest.all,
  validateIncome,
  requireAuth,
  roleAuthorization(['user']),
  editIncome)

router.post('/getDateRange',
  trimRequest.all,
  requireAuth,
  roleAuthorization(['user']),
  getDateRangeIncomes)

router.delete('/incomes',
  trimRequest.all,
  requireAuth,
  roleAuthorization(['user']),
  deleteIncome)

router.post('/appversion',
  trimRequest.all,
  // requireAuth,
  // roleAuthorization(['user']),
  updateAppVersion)

router.get('/appversion',
  trimRequest.all,
  // requireAuth,
  // roleAuthorization(['user']),
  getAppVersion)

router.post('/forgotPassword',
  trimRequest.all,
  forgotPassword
)

router.post('/importData',
  trimRequest.all,
  requireAuth,
  roleAuthorization(['user']),
  importDatas)


router.post('/adminlogin', trimRequest.all, adminvalidateLogin, loginByAdmin)

router.post(
  '/profile',
  trimRequest.all,
  profile
)

module.exports = router
