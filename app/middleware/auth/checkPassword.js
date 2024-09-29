const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {Object} user - user object
 * @returns {boolean}
 */
const checkPassword = (Password = '', user = {}) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(Password, (err, isMatch) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      if (!isMatch) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

module.exports = { checkPassword }
