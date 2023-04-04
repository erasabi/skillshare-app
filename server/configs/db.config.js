// config.js

module.exports = {
	development: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		// switch `database` value to <your-testDB-name> when testing
		database: process.env.DB_SCHEMA || 'postgres',
		port: process.env.DB_PORT || 5432,
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'postgres',
		dialectOptions: {
			ssl: process.env.DB_SSL == 'true'
		},
		pool: {
			// max: maximum number of connection in pool
			// min: minimum number of connection in pool
			// idle: maximum time, in milliseconds, that a connection can be idle before being released
			// acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		// enables logging of SQL queries (defaults to console.log)
		logging: process.env.DB_DEBUG || false
	}
}
