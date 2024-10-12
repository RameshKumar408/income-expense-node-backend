const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})
const trimRequest = require('trim-request')

const { addWebsiteDatas, getWebsiteDatas, getSingleDatas } = require('../controllers/password')
const { roleAuthorization } = require('../controllers/auth')

const { validateAddDatas } = require('../controllers/password/validators')



router.post('/create-data', trimRequest.all, requireAuth, roleAuthorization(['user']), validateAddDatas, addWebsiteDatas)
router.get('/get-data', trimRequest.all, requireAuth, roleAuthorization(['user']), getWebsiteDatas)
router.post('/get-single', trimRequest.all, requireAuth, roleAuthorization(['user']), getSingleDatas)


module.exports = router