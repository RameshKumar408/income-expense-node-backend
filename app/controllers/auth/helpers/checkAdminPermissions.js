// const Admin = require('../../../models/admin')
const User = require('../../../models/user')
const { itemNotFound, buildErrObject } = require('../../../middleware/utils')

/**
 * Checks against admin if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkAdminPermissions = ({ id = '', roles = [] }, next) => {
  return new Promise((resolve, reject) => {
    User.findById(id, async (err, result) => {
      try {
        await itemNotFound(err, result, 'ADMIN_NOT_FOUND')
        if (roles.indexOf(result.role) > -1) {
          return resolve(next())
        }
        reject(buildErrObject(401, 'UNAUTHORIZED'))
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { checkAdminPermissions }
