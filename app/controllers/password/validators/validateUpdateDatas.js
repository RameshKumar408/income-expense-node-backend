

const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
/**
 * Validates login request
 */
const validateUpdateDatas = [
    check('id')
        .exists()
        .withMessage('id MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter id'),
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

module.exports = { validateUpdateDatas }
