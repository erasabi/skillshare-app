'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Roles', [
			{
				id: 1,
				name: 'user',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 2,
				name: 'moderator',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 3,
				name: 'admin',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Roles', null, {})
	}
}
