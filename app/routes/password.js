const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})
const trimRequest = require('trim-request')

const { addWebsiteDatas, getWebsiteDatas, getSingleDatas, deleteWebsiteDatas, updateWebsiteDatas } = require('../controllers/password')
const { roleAuthorization } = require('../controllers/auth')

const { validateAddDatas, validateUpdateDatas } = require('../controllers/password/validators')



router.post('/create-data', trimRequest.all, requireAuth, roleAuthorization(['user']), validateAddDatas, addWebsiteDatas)
router.post('/update-data', trimRequest.all, requireAuth, roleAuthorization(['user']), validateUpdateDatas, updateWebsiteDatas)
router.get('/get-data', trimRequest.all, requireAuth, roleAuthorization(['user']), getWebsiteDatas)
router.post('/get-single', trimRequest.all, requireAuth, roleAuthorization(['user']), getSingleDatas)
router.post('/delete-data', trimRequest.all, requireAuth, roleAuthorization(['user']), deleteWebsiteDatas)


module.exports = router