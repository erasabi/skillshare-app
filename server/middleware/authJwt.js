const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config.js')
const db = require('../database')
const User = db.Users

const { TokenExpiredError } = jwt

const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res
			.status(401)
			.send({ message: 'Unauthorized! Access Token has expired!' })
	}
	return res.sendStatus(401).send({ message: 'Unauthorized!' })
}

const verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token']

	if (!token) {
		return res.status(403).send({ message: 'No token provided!' })
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) return catchError(err, res)

		req.userId = decoded.id
		req.accountId = decoded.accountId

		return next()
	})
}

const idMatchesUser = (req, res, next) => {
	return req.userId == req.params.id
		? next()
		: res.sendStatus(401).send({ message: 'Unauthorized!' })
}

const isAdmin = (req, res, next) => {
	User.findOne({
		where: {
			accountId: req.accountId
		}
	}).then((user) => {
		const roles = user?.dataValues?.userProfile?.roles
		if (roles) {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i] === 'admin') {
					return next()
				}
			}
			res.status(403).send({
				message: 'Require Admin Role!'
			})
			return
		}
		res.status(500).send({
			message: 'User roles not found!'
		})
		return
	}).catch((err) => {
			res.status(500).send(JSON.stringify(err))
		})
}

const isModerator = (req, res, next) => {
	User.findByPk(req.userId).then((user) => {
		user.getRoles().then((roles) => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'moderator') {
					next()
					return
				}
			}

			res.status(403).send({
				message: 'Require Moderator Role!'
			})
		})
	})
}

const isModeratorOrAdmin = (req, res, next) => {
	User.findByPk(req.userId).then((user) => {
		user.getRoles().then((roles) => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'moderator') {
					next()
					return
				}

				if (roles[i].name === 'admin') {
					next()
					return
				}
			}

			res.status(403).send({
				message: 'Require Moderator or Admin Role!'
			})
		})
	})
}

const authJwt = {
	idMatchesUser: idMatchesUser,
	verifyToken: verifyToken,
	isAdmin: isAdmin,
	isModerator: isModerator,
	isModeratorOrAdmin: isModeratorOrAdmin
}
module.exports = authJwt
