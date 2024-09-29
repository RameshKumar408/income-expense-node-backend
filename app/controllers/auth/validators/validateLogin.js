const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
/**
 * Validates login request
 */
const validateLogin = [
  check('Email')
    .exists()
    .withMessage('Email MISSING')
    .not()
    .isEmpty()
    .withMessage('Please Enter Email'),
  check('Password')
    .exists()
    .withMessage('Password MISSING')
    .not()
    .isEmpty()
    .withMessage('Please Enter Password'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateLogin }
