/*
MODEL ASSOCIATIONS
If you want to know more details about how to make Many-to-Many Associations: https://bezkoder.com/sequelize-associate-many-to-many/

ASSOCIATION TYPES:
		BelongsTo: https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html
		BelongsToMany: https://sequelize.org/master/class/lib/associations/belongs-to-many.js~BelongsToMany.html
		HasMany: https://sequelize.org/master/class/lib/associations/has-many.js~HasMany.html
		HasOne: https://sequelize.org/master/class/lib/associations/has-one.js~HasOne.html
*/

function addModelAssociations(models) {
	// indicates that the role model can belong to many Users
	models.Roles.belongsToMany(models.Users, {
		// though: The name of the table that is used to join source and target in n:m associations
		through: 'user_roles',
		// foreignKey: column name for the key identifying the SOURCE model(so Role)
		foreignKey: 'roleId',
		//   otherKey:  column name for the key identifying the TARGET model(so Users)
		otherKey: 'userId',
		onDelete: 'cascade'
	})

	// indicates that the user model can belong to many Roles
	models.Users.belongsToMany(models.Roles, {
		through: 'user_roles',
		foreignKey: 'userId',
		otherKey: 'roleId',
		onDelete: 'cascade'
	})

	models.RefreshToken.belongsTo(models.Users, {
		foreignKey: 'userId',
		targetKey: 'id'
	})

	// don't uncomment until fixing remove expired refreshToken conflict
	// models.Users.hasOne(models.RefreshToken, {
	// 	foreignKey: 'id',
	// 	targetKey: 'userId'
	// })

	models.ROLES = ['user', 'admin', 'moderator']
}

module.exports = { addModelAssociations }
