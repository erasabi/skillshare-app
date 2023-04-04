let express = require('express')
const authRouter = require('./auth.routes')
let indexRouter = express.Router()
let usersRouter = require('./user.routes')
let mentorProfilesRouter = require('./mentor.routes')

module.exports = {
	authRouter: authRouter,
	indexRouter: indexRouter,
	usersRouter: usersRouter,
	mentorProfilesRouter: mentorProfilesRouter
}
