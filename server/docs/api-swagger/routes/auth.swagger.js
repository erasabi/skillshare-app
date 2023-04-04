module.exports = {
	'api/auth/signup': {
		post: {
			tags: ['Auth'],
			description: 'Account Registration',
			operationId: 'signin',
			parameters: [],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/SignupRequest'
						}
					}
				}
			},
			responses: {
				201: {
					description: 'User was registered successfully!'
				},
				500: {
					description: 'Failed! Username is already in use!'
				}
			}
		}
	},
	'api/auth/signin': {
		post: {
			tags: ['Auth'],
			description: 'Account Signin',
			operationId: 'signin',
			parameters: [],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							properties: {
								username: {
									type: 'string',
									description: 'Username',
									example: 'jDoe'
								},
								password: {
									type: 'string',
									description: 'User Password',
									example: 'P4$$wordExample'
								}
							}
						}
					}
				}
			},
			responses: {
				201: {
					description: '?'
				},
				500: {
					description: '?'
				}
			}
		}
	},
	'api/auth/refreshToken': {
		post: {
			tags: ['Auth'],
			description: 'Session Token Refresh',
			operationId: 'signin',
			parameters: [],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							properties: {
								refreshToken: {
									type: 'string',
									description: 'RefreshToken',
									example: 'ca3a2664-b4b2-419e-ac8a-b68a7149bc19'
								}
							}
						}
					}
				}
			},
			responses: {
				201: {
					description: '?'
				},
				500: {
					description: '?'
				}
			}
		}
	}
}
