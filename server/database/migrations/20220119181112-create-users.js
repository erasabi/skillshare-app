'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			accountId: {
				allowNull: false,
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING
			},
			userName: {
				allowNull: false,
				type: Sequelize.STRING
			},
			firstName: {
				allowNull: false,
				type: Sequelize.STRING
			},
			lastName: {
				allowNull: false,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING
			},
			darkModeEnabled: {
				type: Sequelize.BOOLEAN
			},
			userProfile: {
				type: Sequelize.JSON
			},
			mentorProfile: {
				type: Sequelize.JSON
			},
			menteeProfile: {
				type: Sequelize.JSON
			},
			appointments: {
				type: Sequelize.JSON
			},
			metaData: {
				type: Sequelize.JSON
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users')
	}
}
