const config = require('../../configs/auth.config')
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, Sequelize) => {
	const RefreshToken = sequelize.define('RefreshToken', {
		token: {
			type: Sequelize.STRING
		},
		expiryDate: {
			type: Sequelize.DATE
		}
	})

	RefreshToken.createToken = async function (user) {
		try {
			let expiredAt = new Date()

			expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration)

			let _token = uuidv4()

			let refreshToken = await this.create({
				token: _token,
				userId: user.id,
				accountId: user.accountId,
				expiryDate: expiredAt.getTime()
			})

			return refreshToken.token
		} catch (error) {
			return error.message
		}
	}

	RefreshToken.verifyExpiration = (token) => {
		return token.expiryDate.getTime() < new Date().getTime()
	}

	return RefreshToken
}
