const config = require('../../configs/db.config')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sequelize = new Sequelize(config.development)
// create array of existing models
const modelDefiners = [
	require('./mentorprofiles.js'),
	require('./role.js'),
	require('./users.js'),
	require('./refreshToken.js'),
	require('./appointment.js')
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize, Sequelize)
}

module.exports = {
	sequelize: sequelize,
	models: sequelize.models,
	Op: Op
}
