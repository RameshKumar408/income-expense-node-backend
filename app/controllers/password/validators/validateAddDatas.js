

const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
/**
 * Validates login request
 */
const validateAddDatas = [
    check('website')
        .exists()
        .withMessage('website MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter website'),
    check('username')
        .exists()
        .withMessage('username MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter username'),
    check('password')
        .exists()
        .withMessage('password MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter password'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateAddDatas }
