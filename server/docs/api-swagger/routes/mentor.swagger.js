module.exports = {
	'api/mentors': {
		get: {
			tags: ['Mentors'],
			description: '',
			operationId: 'getMentors',
			parameters: [],
			responses: {
				200: {
					description: '',
					content: {
						'application/json': {
							schema: {
								properties: {
									mentorProfile: {
										type: 'string',
										description: '',
										example: ''
									}
								}
							}
						}
					}
				},
				500: {
					description: '?'
				}
			}
		}
	},
	'api/mentors/{id}': {
		get: {
			tags: ['Mentors'],
			description: '',
			operationId: 'getMentors',
			parameters: [
				{
					name: 'id',
					in: 'path',
					schema: {
						properties: {
							id: {
								type: 'string',
								description: '',
								example: ''
							}
						}
					},
					required: true,
					description: ''
				}
			],
			responses: {
				200: {
					description: '',
					content: {
						'application/json': {
							schema: {
								properties: {
									mentorProfile: {
										type: 'string',
										description: '',
										example: ''
									}
								}
							}
						}
					}
				},
				500: {
					description: '?'
				}
			}
		}
	},
	'api/mentors/search': {
		post: {
			tags: ['Mentors'],
			description: '',
			operationId: '',
			parameters: [],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							properties: {
								skill: {
									type: 'string',
									description: 'Mentor skill name',
									example: 'python'
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
	'api/mentors/profile': {
		post: {
			tags: ['Mentors'],
			description: '',
			operationId: '',
			parameters: [],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							properties: {
								mentorProfile: {
									type: 'string',
									description: '',
									example: ''
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
