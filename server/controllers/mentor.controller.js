const db = require('../database')
let path = require('path')
const Op = db.Op
const userController = require('./user.controller')

async function findMentorById(id) {
	return await db.Users.findOne({
		where: {
			accountId: id
		}
	})
}

async function updateMentorProfile(req, res, updatedMentorProfile) {
	const user = await db.Users.update(updatedMentorProfile, {
		where: {
			accountId: updatedMentorProfile.accountId
		}
	})

	user
		? res.send({ message: 'Mentor profile updated successfully!' })
		: res.status(500).send({ message: 'Mentor profile update failed!' })
}

async function findMentorsBySkill(skill) {
	const mentors = await db.Users.findAll({
		attributes: {
			exclude: ['password']
		},
		where: {
			'mentorProfile.skills': {
				[Op.like]: '%' + skill + '%'
			}
		}
	})
	return await Promise.all(
		await mentors.map(async (user, index) => {
			user.dataValues.totalMentorHours =
				await userController.getTotalMentorHours(user.accountId)

			const appointments = await db.Appointment.findAll({
				where: {
					accountId: user.accountId,
					type: 'available',
					endTime: {
						[Op.gte]: new Date()
					}
				},
				order: [['startTime', 'ASC']]
			})

			return {
				...user.dataValues,
				availability: appointments.map((apt) => apt.dataValues)
			}
		})
	)
}

async function findMetaDataById(id) {
	return await db.Users.findOne({
		attributes: ['metaData'],
		where: {
			accountId: id
		}
	})
}

exports.getMentors = (req, res) => {
	db.Users.findAll({
		attributes: ['mentorProfile']
	})
		.then((requests) => {
			res.status(200).send(JSON.stringify(requests))
		})
		.catch((err) => {
			res.status(500).send(JSON.stringify(err))
		})
}

exports.getMentorById = (req, res) => {
	findMentorById(req.params.id)
		.then((response) => {
			res.status(200).send(JSON.stringify(response))
		})
		.catch((err) => {
			res.status(500).send(JSON.stringify(err))
		})
}

exports.setMentorProfile = async (req, res) => {
	try {
		const user = await findMentorById(req.body.accountId)

		const mentorProfile = req.body.mentorProfile
		user?.dataValues
			? await updateMentorProfile(req, res, {
					...user.dataValues,
					mentorProfile
			  })
			: res.status(500).send({ message: 'Mentor profile not found.' })
	} catch (err) {
		res.status(500).send(err)
	}
}

exports.searchMentors = (req, res) => {
	findMentorsBySkill(req.body.skills)
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((err) => {
			res.status(500).send(err)
		})
}

exports.getUserProfileImage = (req, res) => {
	const { id: accountId } = req.params

	findMetaDataById(accountId)
		.then((images) => {
			if (images.metaData?.filepath) {
				const dirname = path.resolve()
				const fullfilepath = path.join(dirname, images.metaData.filepath)
				return res
					.status(200)
					.type(images.metaData.mimetype)
					.sendFile(fullfilepath)
			}
			images.metaData
				? res.status(204).send({ message: 'Profile image not set.' })
				: res.status(404).send({ message: 'Profile image data missing!' })
		})
		.catch((err) => {
			res.status(500).send(JSON.stringify(err))
		})
}
