module.exports = {
	secret: 'super-temporary-secret-key',
	jwtExpiration: 7200, // 2 hours
	jwtRefreshExpiration: 86400 // 24 hours

	// // /* shorter option */
	// jwtExpiration: 600,           // 10 minutes
	// jwtRefreshExpiration: 3600,   // 1 hour

	/* for testing refresh and expiration */
	// jwtExpiration: 10,          // 10 seconds
	// jwtRefreshExpiration: 30,  // 30 minute
}
