let express = require('express')
let router = express.Router()
const { verifySignUp } = require('../middleware')
const controller = require('../controllers/auth.controller')

router.post('/refreshtoken', controller.refreshToken)

router.post('/signin', controller.signin)

router.post(
	'/signup',
	[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
	controller.signup
)

module.exports = router
