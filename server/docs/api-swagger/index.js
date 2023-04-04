const swaggerConfig = require('./swaggerConfig')
const servers = require('./servers')
const components = require('./components')
const tags = require('./tags')
const paths = require('./routes/index')

module.exports = {
	...swaggerConfig,
	...servers,
	...components,
	...tags,
	...paths
}
