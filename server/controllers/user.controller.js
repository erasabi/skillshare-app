const db = require('../database')
const bcrypt = require('bcryptjs')
const path = require('path')
const { Op } = require('sequelize')

async function findUserById(id) {
	return await db.Users.findOne({
		where: {
			accountId: id
		}
	})
}

async function findUserProfileById(id) {
	return await db.Users.findOne({
		attributes: ['userProfile'],
		where: {
			accountId: id
		}
	})
}

async function updateUserProfile(req, res, updatedUser) {
	const user = await db.Users.update(updatedUser, {
		where: {
			accountId: updatedUser.accountId
		}
	})

	user
		? res.send({ message: 'User profile updated successfully!' })
		: res.status(500).send({ message: 'User profile update failed!' })
}

async function updateUserMetaData(req, res, updatedUserProfile) {
	const user = await db.Users.update(updatedUserProfile, {
		where: {
			accountId: updatedUserProfile.accountId
		}
	})

	user
		? res.send({ ...updatedUserProfile.metaData, success: true })
		: res.status(500).send({ message: 'User profile update failed!' })
}

exports.getUsers = (req, res) => {
	db.Users.findAll({
		attributes: { exclude: ['password'] }
	})
		.then((users) => {
			users.map((user) => {
				let usersAndRoles = []
				user.getRoles().then((roles) => {
					usersAndRoles.push({ ...user.dataValues, roles: roles })
				})
			})
			res.status(200).send(JSON.stringify(users))
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(JSON.stringify([]))
		})
}

exports.getUserById = (req, res) => {
	db.Users.findOne({
		attributes: { exclude: ['password'] },
		where: {
			accountId: req.params.id
		}
	})
		.then((response) => {
			res.status(200).send(JSON.stringify(response))
		})
		.catch((err) => {
			res.status(500).send(JSON.stringify(err))
		})
}

exports.getUserProfileById = (req, res) => {
	findUserProfileById(req.params.id)
		.then((response) => {
			res.status(200).send(JSON.stringify(response))
		})
		.catch((err) => {
			res.status(500).send(JSON.stringify(err))
		})
}

exports.setUserProfile = async (req, res) => {
	const user = await findUserProfileById(req.body.accountId)
	user?.dataValues
		? await updateUserProfile(req, res, { ...user.dataValues, ...req.body })
		: res.status(500).send({ message: 'User profile not found.' })
}

exports.setUser = async (req, res) => {
	const user = await findUserById(req.body.accountId)
	const password = req.body.password
		? bcrypt.hashSync(req.body.password, 8)
		: user.dataValues.password
	const updatedUser = user?.dataValues
		? {
				...user.dataValues,
				...req.body,
				password: password
		  }
		: {}

	user?.dataValues
		? await updateUserProfile(req, res, updatedUser)
		: res.status(500).send({ message: 'User not found.' })
}

exports.setTest = async (req, res) => {
	try {
		const { id: accountId } = req.params
		const { filename, mimetype, size } = req.file
		const filepath = req.file.path
		const metaData = {
			filename: filename,
			filepath: filepath,
			mimetype: mimetype,
			size: size
		}

		const user = await findUserById(accountId)

		user?.dataValues
			? await updateUserMetaData(req, res, {
					...user.dataValues,
					metaData: metaData
			  })
			: res.status(500).send({ message: 'User not found.' })
	} catch (err) {
		res.status(500).send(err)
	}
}

async function findMetaDataById(id) {
	return await db.Users.findOne({
		attributes: ['metaData'],
		where: {
			accountId: id
		}
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

function getDuration(startTime, endTime) {
	const differenceInMilliseconds = Math.abs(
		new Date(endTime).getTime() - new Date(startTime).getTime()
	)
	const diffenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60)

	return diffenceInMinutes
}

async function createSingleAppointment(accountId, body) {
	try {
		const newAppointment = {
			accountId: accountId,
			type: 'available',
			startTime: new Date(body.startTime),
			endTime: new Date(body.endTime),
			duration: getDuration(body.startTime, body.endTime)
		}
		if (await conflictingAppointmentExists(accountId, newAppointment))
			throw new Error(`Error creating single appointment!`)

		await db.Appointment.create(newAppointment).catch((error) =>
			console.log(error)
		)

		return await db.Appointment.findOne({
			where: {
				accountId: accountId,
				startTime: {
					[Op.eq]: newAppointment.startTime
				}
			}
		})
	} catch (error) {
		console.log(error)
	}
}

function addMonth(date) {
	date.setMonth(date.getMonth() + 1)
	return date
}

function addWeek(date) {
	date.setDate(date.getDate() + 7)
	return date
}

function addDay(date) {
	date.setDate(date.getDate() + 1)
	return date
}

async function getAvailableAppointments(id) {
	return await db.Appointment.findAll({
		where: {
			accountId: id,
			type: 'available',
			endTime: {
				[Op.gte]: new Date()
			}
		},
		order: [['startTime', 'ASC']]
	})
}

async function getPastAppointments(id, type) {
	switch (type) {
		case 'mentor':
			return await db.Appointment.findAll({
				where: {
					accountId: id,
					type: {
						[Op.ne]: 'available'
					},
					endTime: {
						[Op.lte]: new Date()
					}
				},
				order: [['startTime', 'DESC']]
			})

		case 'mentee':
			return await db.Appointment.findAll({
				where: {
					attendeeId: id,
					type: {
						[Op.ne]: 'available'
					},
					endTime: {
						[Op.lte]: new Date()
					}
				},
				order: [['startTime', 'DESC']]
			})
	}
}

async function getUpcomingAppointments(id, type) {
	switch (type) {
		case 'mentor':
			return await db.Appointment.findAll({
				where: {
					accountId: id,
					type: {
						[Op.ne]: 'available'
					},
					endTime: {
						[Op.gte]: new Date()
					}
				},
				order: [['startTime', 'ASC']]
			})

		case 'mentee':
			return await db.Appointment.findAll({
				where: {
					attendeeId: id,
					type: {
						[Op.ne]: 'available'
					},
					endTime: {
						[Op.gte]: new Date()
					}
				},
				order: [['startTime', 'ASC']]
			})
	}
}

exports.getAppointmentsList = async (req, res) => {
	try {
		const { userId, accountId, body } = req
		const id = accountId.toString()
		const { listProfile, listType } = body

		let response
		switch (listType) {
			case 'upcoming':
				response = await getUpcomingAppointments(accountId, listProfile)
				break
			case 'history':
				response = await getPastAppointments(accountId, listProfile)
				break
			case 'available':
				response = await getAvailableAppointments(accountId)
				break
			default:
				console.error('Invalid arguments for getAppointmentsList')
				response = { status: 500 }
		}

		return res.send(response)
	} catch (error) {
		console.log(error)
	}
}

async function conflictingAppointmentExists(accountId, newAppointment) {
	const response = await db.Appointment.findOne({
		where: {
			accountId: accountId,
			[Op.or]: {
				startTime: {
					[Op.and]: {
						[Op.gte]: newAppointment.startTime,
						[Op.lt]: newAppointment.endTime
					}
				},
				endTime: {
					[Op.and]: {
						[Op.gt]: newAppointment.startTime,
						[Op.lte]: newAppointment.endTime
					}
				}
			}
		}
	})
	return response !== null ? true : false
}

async function addRepeatingAvailabiltySetting(id, apt) {
	const response = await findUserById(id)
	const updatedUser = response.dataValues
	updatedUser.appointments
		? updatedUser.appointments.push(apt)
		: (updatedUser.appointments = [apt])

	return await db.Users.update(updatedUser, {
		where: {
			accountId: updatedUser.accountId
		}
	})
}

async function createRepeatAppointments(accountId, body) {
	const repeat = body.repeat
	const endRepeat = new Date(body.endRepeat)

	const appointments = []
	let startTime = new Date(body.startTime)
	let endTime = new Date(body.endTime)
	let isConflictingAppointment = false
	do {
		const newAppointment = {
			accountId: accountId,
			type: 'available',
			startTime: new Date(startTime),
			endTime: new Date(endTime),
			endRepeat: new Date(endRepeat),
			duration: getDuration(startTime, endTime)
		}
		appointments.push(newAppointment)

		switch (repeat) {
			case 'Every Day':
				startTime = addDay(startTime)
				endTime = addDay(endTime)
				break
			case 'Every Week':
				startTime = addWeek(startTime)
				endTime = addWeek(endTime)
				break
			case 'Every Month':
				startTime = addMonth(startTime)
				endTime = addMonth(endTime)
				break
		}

		if (await conflictingAppointmentExists(accountId, newAppointment))
			throw new Error(`Error bulk creating appointments!`)
	} while (endTime < endRepeat && !isConflictingAppointment)

	if (!isConflictingAppointment) {
		const apt = {
			type: 'available',
			startTime: new Date(body.startTime),
			endTime: new Date(body.endTime),
			repeat: body.repeat,
			endRepeat: new Date(body.endRepeat)
		}

		addRepeatingAvailabiltySetting(accountId, apt)
		db.Appointment.bulkCreate(appointments)
	} else {
		console.log('New appointments conflict with already existing ones')
	}
}

exports.setAvailability = async (req, res) => {
	try {
		const { userId, accountId, body } = req
		const id = accountId
		body.repeat === 'None'
			? createSingleAppointment(id, body)
			: createRepeatAppointments(id, body)

		res.status(200).send({ message: 'Appointment(s) created sucessfully!' })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: 'Error creating appointment(s)!' })
	}
}

exports.bookAppointment = async (req, res) => {
	try {
		const { userId, accountId, body } = req
		const updatedAppointment = {
			attendeeId: accountId,
			type: 'booked',
			skill: body.skill,
			status: 'pending',
			message: body.message
		}

		const user = await db.Appointment.findOne({
			where: {
				accountId: body.accountId,
				startTime: {
					[Op.eq]: new Date(body.startTime)
				}
			}
		})
		console.dir(user.dataValues)
		if (user.dataValues) {
			await db.Appointment.update(updatedAppointment, {
				where: {
					accountId: body.accountId,
					startTime: {
						[Op.eq]: new Date(body.startTime)
					}
				}
			})
		} else {
			console.log('Error booking mentor appointment.')
		}
		res.status(200).send({ message: 'Appointment booked successfully!' })
	} catch (error) {
		res.status(500).send({ message: error })
	}
}

exports.acceptAppointment = async (req, res) => {
	try {
		const { userId, accountId, body } = req
		const updatedAppointment = {
			type: 'booked',
			status: 'approved',
			message: body.message
		}

		const user = await db.Appointment.findOne({
			where: {
				accountId: accountId,
				startTime: {
					[Op.eq]: new Date(body.startTime)
				}
			}
		})
		console.dir(user.dataValues)
		if (user.dataValues) {
			const r = await db.Appointment.update(updatedAppointment, {
				where: {
					accountId: accountId,
					startTime: {
						[Op.eq]: new Date(body.startTime)
					}
				}
			})
			console.dir(r)
		} else {
			console.log('Error accepting mentor appointment.')
		}
		res.status(200).send({ message: 'Appointment accepted successfully!' })
	} catch (error) {
		res.status(500).send({ message: error })
	}
}

exports.denyAppointment = async (req, res) => {
	try {
		const { userId, accountId, body } = req
		const updatedAppointment = {
			type: 'available',
			skill: null,
			status: 'denied',
			message: body.message
		}

		const user = await db.Appointment.findOne({
			where: {
				accountId: accountId,
				startTime: {
					[Op.eq]: new Date(body.startTime)
				}
			}
		})

		console.dir(user.dataValues)

		if (user.dataValues) {
			await db.Appointment.update(updatedAppointment, {
				where: {
					accountId: accountId,
					startTime: {
						[Op.eq]: new Date(body.startTime)
					}
				}
			})
		} else {
			console.log('Error denying appointment request.')
		}
		res
			.status(200)
			.send({ message: 'Appointment request denied successfully!' })
	} catch (error) {
		res.status(500).send({ message: error })
	}
}

exports.cancelAppointment = async (req, res) => {
	try {
		const { userId, accountId, body } = req
		const updatedAppointment = {
			type: 'available',
			skill: null,
			status: 'cancelled',
			message: ''
		}

		const user = await db.Appointment.findOne({
			where: {
				attendeeId: body.attendeeId,
				startTime: {
					[Op.eq]: new Date(body.startTime)
				}
			}
		})

		console.dir(user.dataValues)

		if (user.dataValues) {
			await db.Appointment.update(updatedAppointment, {
				where: {
					attendeeId: body.attendeeId,
					startTime: {
						[Op.eq]: new Date(body.startTime)
					}
				}
			})
		} else {
			console.log('Error cancelling appointment.')
		}
		res.status(200).send({ message: 'Appointment cancelled successfully!' })
	} catch (error) {
		res.status(500).send({ message: error })
	}
}

async function getTotalMenteeHours(id) {
	const [results] = await db.sequelize.query(
		`SELECT COALESCE(SUM(duration), 0) FROM "Appointments" WHERE "attendeeId"='${id.toString()}' AND "endTime" < now()`
	)
	const totalHours = parseFloat(results[0].coalesce) / 60

	return totalHours.toFixed(2)
}

async function getTotalMentorHours(id) {
	const [results] = await db.sequelize.query(
		`SELECT COALESCE(SUM(duration), 0) FROM "Appointments" WHERE "accountId"='${id.toString()}' AND "endTime" < now() AND "type"='booked'`
	)
	const totalHours = parseFloat(results[0].coalesce) / 60

	return totalHours.toFixed(2)
}
exports.getTotalMentorHours = (id) => getTotalMentorHours(id)

exports.getTotalHours = async (req, res) => {
	try {
		const { body } = req

		const totalhours =
			body.type === 'mentor'
				? await getTotalMentorHours(body.id)
				: await getTotalMenteeHours(body.id)

		return res.send(totalhours)
	} catch (error) {
		console.log(error)
	}
}

async function getDataBySkill(appointments) {
	let stats = {}
	let colorCount = 0
	const colorWheel = ['deepSkyBlue', 'indigo', 'coral', 'gold', 'deepPink']
	appointments.map(async (appointment) => {
		const { skill, startTime, endTime, duration } = appointment.dataValues
		// stats[skill] = (stats[skill] || 0) + (new Date(endTime).getTime() - new Date(startTime).getTime());
		stats[skill] = stats[skill] || { title: skill, value: 0 }
		// let hours = Math.abs((new Date(endTime).getTime() - new Date(startTime).getTime())) / 36e5;
		let hours = duration / 60
		stats[skill] = {
			title: skill,
			value: stats[skill].value + hours
		}
		if (!stats[skill]?.color) {
			stats[skill].color = colorWheel[colorCount]
			colorCount = (colorCount + 1) % colorWheel.length
		}
	})

	return stats
}

exports.getMenteeStatistics = async (req, res) => {
	try {
		const { accountId } = req
		const appointments = await db.Appointment.findAll({
			where: {
				attendeeId: accountId,
				endTime: {
					[Op.lte]: new Date()
				}
			}
		})

		const statistics = {
			dataBySkill: await getDataBySkill(appointments),
			totalHours: await getTotalMenteeHours(accountId)
		}

		return res.send(statistics)
	} catch (error) {
		console.log(error)
	}
}

exports.getMentorStatistics = async (req, res) => {
	try {
		const { accountId } = req
		const appointments = await db.Appointment.findAll({
			where: {
				accountId: accountId,
				type: 'booked',
				endTime: {
					[Op.lte]: new Date()
				}
			}
		})

		const statistics = {
			dataBySkill: await getDataBySkill(appointments),
			totalHours: await getTotalMentorHours(accountId)
		}

		return res.send(statistics)
	} catch (error) {
		console.log(error)
	}
}
