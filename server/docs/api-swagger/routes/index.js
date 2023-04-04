const authSwagger = require('./auth.swagger')
const mentorSwagger = require('./mentor.swagger')

module.exports = {
	paths: {
		...authSwagger,
		...mentorSwagger
	}
}
