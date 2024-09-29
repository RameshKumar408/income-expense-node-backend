const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (deviceid = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        Email: deviceid
      },
      'Password loginAttempts blockExpires Name role verified verification Email',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'Email Not Found')
          resolve(item)
        } catch (error) {
          resolve(error)
        }
      }
    )
  })
}

module.exports = { findUser }
