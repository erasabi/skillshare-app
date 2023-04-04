module.exports = {
	components: {
		schemas: {
			SignupRequest: {
				type: 'object',
				properties: {
					username: {
						type: 'string',
						description: '',
						example: 'jDoe'
					},
					email: {
						type: 'string',
						description: '',
						example: 'email@domain.com'
					},
					password: {
						type: 'string',
						description: '',
						example: 'P4$$wordExample'
					}
				}
			}
		}
	}
}
