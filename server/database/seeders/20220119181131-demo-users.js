'use strict'
var bcrypt = require('bcryptjs')
var dayjs = require('dayjs')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const demoUserPswd = 'P@$$w0rd'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const emplStreetAddr = '600 Peachtree NE, Suite 3910 '
		const emplCityAddr = 'Atlanta GA 30308'

		const users = [
			//0
			{
				userName: 'rick',
				firstName: 'Rick',
				lastName: 'Sanchez',
				email: 'rsanchez@gmail.com',
				employeeId: 'rs123',
				picture: 'user0'
			},
			//1
			{
				userName: 'jdoe',
				firstName: 'John',
				lastName: 'Doe',
				email: 'jdoe@gmail.com',
				employeeId: 'jd123',
				picture: 'anonymous-logo'
			},
			//2
			{
				userName: 'morty',
				firstName: 'Morty',
				lastName: 'Smith',
				email: 'msmith@gmail.com',
				employeeId: 'ms123',
				picture: 'user1'
			},
			//3
			{
				userName: 'summer',
				firstName: 'Summer',
				lastName: 'Smith',
				email: 'ssmith@gmail.com',
				employeeId: 'ss123',
				picture: 'user2'
			},
			//4
			{
				userName: 'jerry',
				firstName: 'Jerry',
				lastName: 'Smith',
				email: 'jsmith@gmail.com',
				employeeId: 'js123',
				picture: 'user3'
			},
			//5
			{
				userName: 'beth',
				firstName: 'Beth',
				lastName: 'Smith',
				email: 'bsmith@gmail.com',
				employeeId: 'bs123',
				picture: 'user4'
			},
			//6
			{
				userName: 'pickle',
				firstName: 'Pickle',
				lastName: 'Rick',
				email: 'prick@gmail.com',
				employeeId: 'pr123',
				picture: 'user5'
			},
			//7
			{
				userName: 'birdperson',
				firstName: 'Bird',
				lastName: 'Person',
				email: 'birdperson@gmail.com',
				employeeId: 'br123',
				picture: 'user6'
			}
		]

		return queryInterface.bulkInsert('Users', [
			{
				accountId: '1',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[0].userName,
				firstName: users[0].firstName,
				lastName: users[0].lastName,
				email: users[0].email,
				darkModeEnabled: true,
				appointments: null,
				userProfile: JSON.stringify({
					userName: users[0].userName,
					firstName: users[0].firstName,
					lastName: users[0].lastName,
					email: users[0].email,
					roles: ['user'],
					jobClassification: 'Ops Sup Intermed Analyst',
					position: 'OFFICER',
					locationStreet: emplStreetAddr,
					locationCity: emplCityAddr,
					employeeId: users[0].employeeId
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '36',
					skills: ['self-confidence', 'yoga'],
					rating: 4.6
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '0'
				}),
				metaData: JSON.stringify({
					filename: users[0].picture,
					filepath: 'image-samples/' + users[0].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 23991,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[1].userName,
				firstName: users[1].firstName,
				lastName: users[1].lastName,
				email: users[1].email,
				darkModeEnabled: false,
				appointments: JSON.stringify([
					{
						startTime: dayjs('09:00:00', 'HH:mm:ss')
							.add(5, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endTime: dayjs('10:00:00', 'HH:mm:ss')
							.add(5, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endRepeat: '2022-12-31T00:00:00.000Z',
						repeat: 'Every Week',
						type: 'available'
					}
				]),
				userProfile: JSON.stringify({
					userName: users[1].userName,
					firstName: users[1].firstName,
					lastName: users[1].lastName,
					email: users[1].email,
					roles: ['user', 'admin'],
					jobClassification: 'IT Support',
					position: 'Specialist',
					locationStreet: emplStreetAddr,
					locationCity: emplCityAddr,
					employeeId: 'jd123'
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '3',
					skills: ['Big Data', 'SQL'],
					rating: 3.8
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '700'
				}),
				metaData: JSON.stringify({
					filename: users[1].picture,
					filepath: 'image-samples/' + users[1].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 20499,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[2].userName,
				firstName: users[2].firstName,
				lastName: users[2].lastName,
				email: users[2].email,
				darkModeEnabled: true,
				appointments: JSON.stringify([
					{
						startTime: dayjs('13:00:00', 'HH:mm:ss')
							.add(1, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endTime: dayjs('14:00:00', 'HH:mm:ss')
							.add(1, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endRepeat: '2022-12-31T00:00:00.000Z',
						repeat: 'Every Week',
						type: 'available'
					}
				]),
				userProfile: JSON.stringify({
					userName: users[2].userName,
					firstName: users[2].firstName,
					lastName: users[2].lastName,
					email: users[2].email,
					roles: ['user', 'moderator'],
					jobClassification: 'Apps Support Sr Analyst',
					position: 'AVP',
					locationStreet: emplStreetAddr,
					locationCity: emplCityAddr,
					employeeId: users[2].employeeId
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '3',
					skills: ['bash', 'react', 'yoga'],
					rating: 2.3
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '0'
				}),
				metaData: JSON.stringify({
					filename: users[2].picture,
					filepath: 'image-samples/' + users[2].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 24789,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '4',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[3].userName,
				firstName: users[3].firstName,
				lastName: users[3].lastName,
				email: users[3].email,
				darkModeEnabled: false,
				appointments: JSON.stringify([
					{
						startTime: dayjs('11:30:00', 'HH:mm:ss')
							.add(5, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endTime: dayjs('12:30:00', 'HH:mm:ss')
							.add(5, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endRepeat: '2022-10-31T00:00:00.000Z',
						repeat: 'Every Week',
						type: 'available'
					}
				]),
				userProfile: JSON.stringify({
					userName: users[3].userName,
					firstName: users[3].firstName,
					lastName: users[3].lastName,
					email: users[3].email,
					roles: ['user'],
					jobClassification: 'Ops Sup Manager',
					position: 'AVP',
					locationStreet: emplStreetAddr, //"8800 HIDDEN RIVER PARKWAY ",
					locationCity: emplCityAddr, //"Tampa FL - Florida US 33637",
					employeeId: users[3].employeeId
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '78',
					skills: ['time management', 'yoga'],
					rating: 4.1
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '0'
				}),
				metaData: JSON.stringify({
					filename: users[3].picture,
					filepath: 'image-samples/' + users[3].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 2565,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[4].userName,
				firstName: users[4].firstName,
				lastName: users[4].lastName,
				email: users[4].email,
				darkModeEnabled: false,
				appointments: JSON.stringify([
					{
						startTime: dayjs('13:30:00', 'HH:mm:ss')
							.add(4, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endTime: dayjs('14:30:00', 'HH:mm:ss')
							.add(4, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endRepeat: '2023-01-31T00:00:00.000Z',
						repeat: 'Every Week',
						type: 'available'
					}
				]),
				userProfile: JSON.stringify({
					userName: users[4].userName,
					firstName: users[4].firstName,
					lastName: users[4].lastName,
					email: users[4].email,
					roles: ['user'],
					jobClassification: 'Business Associate',
					position: 'AVP',
					locationStreet: emplStreetAddr, //"8800 HIDDEN RIVER PARKWAY ",
					locationCity: emplCityAddr, //"Tampa FL - Florida US 33637",
					employeeId: users[4].employeeId
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '119',
					skills: ['communication', 'photoshop'],
					rating: 4.5
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '0'
				}),
				metaData: JSON.stringify({
					filename: users[4].picture,
					filepath: 'image-samples/' + users[4].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 22558,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '6',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[5].userName,
				firstName: users[5].firstName,
				lastName: users[5].lastName,
				email: users[5].email,
				darkModeEnabled: false,
				appointments: JSON.stringify([
					{
						startTime: dayjs('15:45:00', 'HH:mm:ss')
							.add(1, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endTime: dayjs('17:00:00', 'HH:mm:ss')
							.add(1, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endRepeat: '2022-12-31T00:00:00.000Z',
						repeat: 'Every Week',
						type: 'available'
					}
				]),
				userProfile: JSON.stringify({
					userName: users[5].userName,
					firstName: users[5].firstName,
					lastName: users[5].lastName,
					email: users[5].email,
					roles: ['user'],
					jobClassification: 'Compensation Senior Analyst',
					position: 'AVP',
					locationStreet: emplStreetAddr,
					locationCity: emplCityAddr,
					employeeId: users[5].employeeId
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '348',
					skills: ['emotional intelligence', 'communication'],
					rating: 3.7
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '0'
				}),
				metaData: JSON.stringify({
					filename: users[5].picture,
					filepath: 'image-samples/' + users[5].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 107069,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '7',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[6].userName,
				firstName: users[6].firstName,
				lastName: users[6].lastName,
				email: users[6].email,
				darkModeEnabled: false,
				appointments: JSON.stringify([
					{
						startTime: dayjs('09:00:00', 'HH:mm:ss')
							.add(1, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endTime: dayjs('10:00:00', 'HH:mm:ss')
							.add(1, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endRepeat: '2022-12-31T00:00:00.000Z',
						repeat: 'Every Week',
						type: 'available'
					},
					{
						startTime: dayjs('13:30:00', 'HH:mm:ss')
							.add(6, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endTime: dayjs('14:30:00', 'HH:mm:ss')
							.add(6, 'day')
							.format('YYYY-MM-DDTHH:mm:ss.000Z'),
						endRepeat: '2022-12-31T00:00:00.000Z',
						repeat: 'Every Week',
						type: 'available'
					}
				]),
				userProfile: JSON.stringify({
					userName: users[6].userName,
					firstName: users[6].firstName,
					lastName: users[6].lastName,
					email: users[6].email,
					roles: ['user'],
					jobClassification: 'Apps Dev Sr Programmer Analyst',
					position: 'AVP',
					locationStreet: emplStreetAddr,
					locationCity: emplCityAddr,
					employeeId: users[6].employeeId
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '1015',
					skills: ['java', 'sushi making'],
					rating: 4.7
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '0'
				}),
				metaData: JSON.stringify({
					filename: users[6].picture,
					filepath: 'image-samples/' + users[6].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 17034,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				password: bcrypt.hashSync(demoUserPswd, 8),
				userName: users[7].userName,
				firstName: users[7].firstName,
				lastName: users[7].lastName,
				email: users[7].email,
				darkModeEnabled: false,
				appointments: JSON.stringify([
					{
						startTime: dayjs('16:15:00', 'HH:mm:ss').format(
							'YYYY-MM-DDTHH:mm:ss.000Z'
						),
						endTime: dayjs('17:00:00', 'HH:mm:ss').format(
							'YYYY-MM-DDTHH:mm:ss.000Z'
						),
						endRepeat: '2022-12-31T00:00:00.000Z',
						repeat: 'Every Month',
						type: 'available'
					}
				]),
				userProfile: JSON.stringify({
					userName: users[7].userName,
					firstName: users[7].firstName,
					lastName: users[7].lastName,
					email: users[7].email,
					roles: ['user'],
					jobClassification: 'Apps Development Group Manager',
					position: 'SVP',
					locationStreet: emplStreetAddr,
					locationCity: emplCityAddr,
					soeid: users[7].employeeId
				}),
				mentorProfile: JSON.stringify({
					totalMentorHours: '15',
					skills: ['bash', 'python', 'storytelling'],
					rating: 4.9
				}),
				menteeProfile: JSON.stringify({
					totalMenteeHours: '15'
				}),
				metaData: JSON.stringify({
					filename: users[7].picture,
					filepath: 'image-samples/' + users[7].picture + '.jpg',
					mimetype: 'image/jpeg',
					size: 17034,
					success: true
				}),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('user_roles', null, {})
		return queryInterface.bulkDelete('Users', null, {})
	}
}
