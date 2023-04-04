'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Appointments', {
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
			attendeeId: {
				type: Sequelize.STRING
			},
			type: {
				type: Sequelize.ENUM('available', 'booked')
			},
			skill: {
				type: Sequelize.STRING
			},
			startTime: {
				allowNull: false,
				type: Sequelize.DATE
			},
			endTime: {
				allowNull: false,
				type: Sequelize.DATE
			},
			duration: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.ENUM('approved', 'pending', 'denied', 'cancelled')
			},
			message: {
				type: Sequelize.STRING
			},
			duration: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable('Appointments')
	}
}
