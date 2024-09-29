const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
/**
 * Validates login request
 */
const validateIncome = [
    check('Title')
        .exists()
        .withMessage('Title MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter Title'),
    check('Description'),
    check('Id'),
    check('Amount')
        .exists()
        .withMessage('Amount MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter Amount'),
    check('Type')
        .exists()
        .withMessage('Type MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter Type'),
    check('Date')
        .exists()
        .withMessage('Date MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter Date'),
    check('TimeStamp')
        .exists()
        .withMessage('TimeStamp MISSING')
        .not()
        .isEmpty()
        .withMessage('Please Enter TimeStamp'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateIncome }
