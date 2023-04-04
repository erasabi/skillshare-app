const { Op, models, sequelize } = require('./models')
const { addModelAssociations } = require('./addAssociations.db')

// call here when troubleshooting db connection
const getDbConnectionStatus = async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

// add any associations to models
addModelAssociations(models)

module.exports = {
	Op: Op,
	sequelize: sequelize,
	...models
}
