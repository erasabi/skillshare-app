'use strict'
const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Users.init(
		{
			// accountId: {
			//   type: DataTypes.UUID,
			//   allowNull: false,
			//   primaryKey: true,
			//   defaultValue: Sequelize.UUIDV4,
			// },
			accountId: DataTypes.STRING,
			// password: DataTypes.STRING,
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					min: 6
				}
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			darkModeEnabled: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defualtValue: false
			},
			// avatar: {
			//   type: DataTypes.JSON,
			//   defaultValue: JSON.stringify({
			//     "filename": "mounika",
			//     "filepath": "image-samples/mounika.jpg",
			//     "mimetype": "image/jpeg",
			//     "size": 24789,
			//     "success": true
			//   }),
			// },
			// address: {
			//   type: DataTypes.JSON,
			// },
			userProfile: DataTypes.JSON,
			mentorProfile: DataTypes.JSON,
			menteeProfile: DataTypes.JSON,
			appointments: DataTypes.JSON,
			metaData: DataTypes.JSON
		},
		{
			sequelize,
			modelName: 'Users'
		}
	)
	return Users
}
