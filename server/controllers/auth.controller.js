const db = require('../database')
const config = require('../configs/auth.config')
const { v4: uuidv4 } = require('uuid')
const User = db.Users
const Role = db.Roles
const RefreshToken = db.RefreshToken

const Op = db.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

var stream = require('stream')

exports.signup = (req, res) => {
	const {
		username,
		firstname,
		lastname,
		email,
		password,
		jobClassification,
		position,
		locationStreet,
		locationCity,
		employeeId
	} = req.body

	User.create({
		accountId: uuidv4().toString(),
		password: bcrypt.hashSync(password, 8),
		userName: username,
		firstName: firstname,
		lastName: lastname,
		email: email,
		darkModeEnabled: false,
		userProfile: {
			userName: username,
			firstName: firstname,
			lastName: lastname,
			email: email,
			roles: ['user'],
			jobClassification: jobClassification,
			position: position,
			locationStreet: locationStreet,
			locationCity: locationCity,
			employeeId: employeeId
		},
		mentorProfile: {
			totalMentorHours: '0',
			skills: []
		},
		menteeProfile: {
			totalMenteeHours: '0'
		},
		appointments: [],
		metaData: {}
	})
		.then((user) => {
			res.status(200).send({ user })
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send({ message: err.message })
		})
}

exports.signin = (req, res) => {
	User.findOne({
		where: {
			'userProfile.userName': req.body.username
		}
	})
		.then(async (user) => {
			if (!user) {
				return res.status(404).send({ message: 'User Not found.' })
			}

			const passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			)

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!'
				})
			}

			const token = jwt.sign(
				{ id: user.id, accountId: user.accountId },
				config.secret,
				{
					expiresIn: config.jwtExpiration
				}
			)

			// remove any leftover tokens that werent removed on signout
			const leftOverRefreshToken = await RefreshToken.findOne({
				where: { userId: user.id }
			})
			if (leftOverRefreshToken)
				await RefreshToken.destroy({ where: { userId: user.id } })

			// once we're sure no existing tokens match the user, create a new token
			let refreshToken = await RefreshToken.createToken(user)

			let authorities = []
			const roles = user.userProfile.roles
			for (let i = 0; i < roles.length; i++) {
				authorities.push('ROLE_' + roles[i].toUpperCase())
			}
			// user.getRoles().then(roles => {
			//   for (let i = 0; i < roles.length; i++) {
			//     authorities.push("ROLE_" + roles[i].name.toUpperCase());
			//   }

			res.status(200).send({
				id: user.id,
				accountId: user.accountId,
				roles: authorities,
				accessToken: token,
				refreshToken: refreshToken
			})
		})
		.catch((err) => {
			res.status(500).send(err)
		})
}

exports.refreshToken = async (req, res) => {
	const { refreshToken: requestToken } = req.body

	if (requestToken == null) {
		return res.status(403).json({ message: 'Refresh Token is required!' })
	}

	try {
		let refreshToken = await RefreshToken.findOne({
			where: { token: requestToken }
		})

		if (!refreshToken) {
			res.status(403).json({
				message: 'Refresh token ' + requestToken + ' is not in database!'
			})
			return
		}

		if (RefreshToken.verifyExpiration(refreshToken)) {
			RefreshToken.destroy({ where: { id: refreshToken.id } })
				.then(
					console.log({
						message: 'Expired Token Successfully removed from database!'
					})
				)
				.catch((err) => {
					console.log(
						'🚀 ~ file: auth.controller.js ~ line 145 ~ exports.refreshToken= ~ err',
						err
					)
				})

			return res.status(403).json({
				message: 'Refresh token was expired. Please make a new signin request'
			})
		}

		const user = await refreshToken.getUser().catch((err) => {
			console.log(err)
		})

		if (!user.id) {
			return res.status(500).json({
				message: 'Error getting refresh token User!'
			})
		}

		let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: config.jwtExpiration
		})

		return res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: refreshToken.token
		})
	} catch (err) {
		return res.status(500).send({ message: err })
	}
}
