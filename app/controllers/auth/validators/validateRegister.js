const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
const validateRegister = [
  check('Name')
    .exists()
    .withMessage('Name MISSING')
    .not()
    .isEmpty()
    .withMessage('please fill Name')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'),
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

module.exports = { validateRegister }
