'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class MentorProfiles extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	MentorProfiles.init(
		{
			accountId: DataTypes.STRING,
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			totalMentorHours: DataTypes.STRING,
			skills: DataTypes.JSON
		},
		{
			sequelize,
			modelName: 'MentorProfiles'
		}
	)
	return MentorProfiles
}
