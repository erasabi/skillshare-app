const db = require('./index.js')

// drop all tables
async function dropAllTables() {
	return await db.sequelize.drop({ cascade: true })
}

dropAllTables()
