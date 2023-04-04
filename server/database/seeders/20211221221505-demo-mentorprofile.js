'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('MentorProfiles', [
			{
				accountId: '1',
				firstName: 'John',
				lastName: 'Doe',
				totalMentorHours: '5',
				skills: JSON.stringify({
					bash: {},
					python: {}
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				firstName: 'Jane',
				lastName: 'Doe',
				totalMentorHours: '15',
				skills: JSON.stringify({
					python: {}
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				firstName: 'Jack',
				lastName: 'Doe',
				totalMentorHours: '35',
				skills: JSON.stringify({
					react: {}
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('MentorProfiles', null, {})
	}
}
