'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Appointment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Appointment.init(
		{
			accountId: DataTypes.STRING,
			attendeeId: DataTypes.STRING,
			type: DataTypes.ENUM('available', 'booked'),
			skill: DataTypes.STRING,
			startTime: DataTypes.DATE,
			endTime: DataTypes.DATE,
			duration: DataTypes.INTEGER,
			status: DataTypes.ENUM('approved', 'pending', 'denied', 'cancelled'),
			message: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Appointment'
		}
	)
	return Appointment
}
