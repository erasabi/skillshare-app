let express = require('express')
let router = express.Router()
const controller = require('../controllers/mentor.controller')
const { authJwt } = require('../middleware')

router.post('/profile', controller.setMentorProfile)

router.post('/search', controller.searchMentors)

router.get('/', controller.getMentors)

router.get('/:id', controller.getMentorById)

module.exports = router
