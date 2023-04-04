let express = require('express')
let router = express.Router()
const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')
const multer = require('multer')

router.get(
	'/profile/avatar/:id',
	// [ authJwt.verifyToken ],
	controller.getUserProfileImage
)

// create multer object
const imageUpload = multer({
	dest: 'images'
})

// upload image
router.post(
	'/profile/image/:id',
	imageUpload.single('image'),
	controller.setTest
)

router.post(
	'/appointments/book',
	[authJwt.verifyToken],
	controller.bookAppointment
)

router.post(
	'/appointments/accept',
	[authJwt.verifyToken],
	controller.acceptAppointment
)

router.post(
	'/appointments/deny',
	[authJwt.verifyToken],
	controller.denyAppointment
)

router.post(
	'/appointments/cancel',
	[authJwt.verifyToken],
	controller.cancelAppointment
)

router.get(
	'/statistics/mentee',
	[authJwt.verifyToken],
	controller.getMenteeStatistics
)

router.get(
	'/statistics/mentor',
	[authJwt.verifyToken],
	controller.getMentorStatistics
)

router.post('/totalhours', [authJwt.verifyToken], controller.getTotalHours)

router.get('/profile/:id', controller.getUserProfileById)

router.post('/profile', controller.setUserProfile)

router.post(
	'/update',
	[authJwt.verifyToken, authJwt.isAdmin],
	controller.setUser
)

router.post('/availability', [authJwt.verifyToken], controller.setAvailability)

router.post(
	'/appointments',
	[authJwt.verifyToken],
	controller.getAppointmentsList
)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], controller.getUsers)

router.get('/:id', [authJwt.verifyToken], controller.getUserById)

router.post(
	'/:id',
	[authJwt.verifyToken, authJwt.idMatchesUser],
	controller.setUser
)

module.exports = router
