const createError = require('http-errors')
// express: node web application framework providing fundamental web/mobile app features
// express resource: http://expressjs.com/en/4x/api.html#express
const express = require('express')
const path = require('path')
// import the library to allow CORS:
const cors = require('cors')
const cookieParser = require('cookie-parser')
// swagger imports
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/api-swagger')
const routers = require('./routes/index')

let app = express()
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
// { extended: true }: req.body object will contain values of any type instead of just strings.
app.use(express.urlencoded({ extended: true }))
// parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser())
// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')))

// add swagger-ui to app
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

// set request origin values allowed by CORS
let corsOptions = {
	origin: '*'
}
// configure CORS middleware
app.use(cors(corsOptions))

// config app routes
app.use('/', routers.indexRouter)
app.use('/api/users', routers.usersRouter)
app.use('/api/mentors', routers.mentorProfilesRouter)
app.use('/api/auth', routers.authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// set response header
app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Headers',
		'x-access-token, Origin, Content-Type, Accept'
	)
	return next()
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.send(JSON.stringify(err))
})

module.exports = app
