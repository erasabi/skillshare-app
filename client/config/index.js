// use fs to check for env files
let fs = require('fs')

// fs root path is the location of the app entry file so path accordingly
const envPath = fs.existsSync('.env.local')
	? '.env.local'
	: fs.existsSync('.env.dev')
	? '.env.dev'
	: fs.existsSync('.env')
	? '.env'
	: null

// dotenv config allows access to process.env variables
envPath
	? require('dotenv').config({ path: envPath })
	: require('dotenv').config()

const NODE_ENV = process.env.APP_ENV === 'production' ? 'none' : 'development'
const DEBUG = process.env.DEBUG || false
const PORT = process.env.PORT || 8080
const API_ENDPOINT = process.env.API_ENDPOINT
const API_REQUEST_CONFIG = () => {
	if (NODE_ENV === 'none') {
		return {}
	} else {
		return { 'Access-Control-Allow-Origin': '*' }
	}
}

module.exports = {
	NODE_ENV: NODE_ENV,
	DEBUG: DEBUG,
	PORT: PORT,
	REACT_APP_API_ENDPOINT: API_ENDPOINT,
	REACT_APP_API_REQUEST_CONFIG: API_REQUEST_CONFIG()
}
