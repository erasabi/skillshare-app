'use strict'
var dayjs = require('dayjs')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Appointments', [
			// user 2 -- Mounika
			//upcoming/available appointments every week 5 days from now
			{
				accountId: '2',
				attendeeId: '6',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(6, 'day').format(), //change to 5
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(6, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(6, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(6, 'day'), 'minute'),
				status: 'approved',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '7',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(13, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(13, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(13, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(13, 'day'), 'minute'),
				status: 'approved',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(20, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(20, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(20, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(20, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '5',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(27, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(27, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(27, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(27, 'day'), 'minute'),
				status: 'pending',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '8',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(34, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(34, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(34, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(34, 'day'), 'minute'),
				status: 'pending',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(41, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(41, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(41, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(41, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(48, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(48, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(48, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(48, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(55, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(5, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(5, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(55, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(62, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(62, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(62, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(62, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(69, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(69, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(69, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(69, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(74, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(74, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(74, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(74, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			//past appointments as a mentor
			{
				accountId: '2',
				attendeeId: '3',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(161, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(132, 'day').format(), //~700 hr
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(132, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(161, 'day'), 'minute'),
				status: 'approved',
				message: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '4',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(154, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(154, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(154, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(154, 'day'), 'minute'),
				status: 'approved',
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '6',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(147, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(147, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(147, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(147, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '3',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(142, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(142, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(142, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(142, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '1',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(135, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(135, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(135, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(135, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '4',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(128, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(128, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(128, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(128, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '6',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(121, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(121, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(121, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(121, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '5',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(114, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(114, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(114, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(114, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '3',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(107, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(107, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(107, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(107, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '6',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(100, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(100, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(100, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(100, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '1',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(93, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(93, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(93, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(93, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '3',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(86, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(86, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(86, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(86, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '5',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(79, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(79, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(79, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(79, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '4',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(72, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(72, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(72, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(72, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(65, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(65, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(65, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(65, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '4',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(58, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(58, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(58, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(58, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '3',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(51, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(51, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(51, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(51, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '1',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(44, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(44, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(44, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(44, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '4',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(37, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(37, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(37, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(37, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '5',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(30, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(30, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(30, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(30, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '6',
				type: 'booked',
				skill: 'Big Data',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(23, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(23, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(23, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(23, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: '8',
				type: 'booked',
				skill: 'SQL',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(16, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(16, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(16, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(16, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(9, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(9, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(9, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(9, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '2',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(2, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(2, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(12, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(12, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// mentee upcoming
			{
				accountId: '5',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('17:00:00', 'HH:mm:ss').format(), // to show red tiles starts in
				endTime: dayjs('18:00:00', 'HH:mm:ss').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss').diff(
					dayjs('18:00:00', 'HH:mm:ss'),
					'minute'
				),
				status: 'approved',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: '2',
				type: 'booked',
				skill: 'java',
				startTime: dayjs('11:00:00', 'HH:mm:ss').add(23, 'hour').format(), // to show orange tiles starts in
				endTime: dayjs('12:00:00', 'HH:mm:ss').add(23, 'hour').format(),
				duration: dayjs('12:00:00', 'HH:mm:ss')
					.add(23, 'hour')
					.diff(dayjs('11:00:00', 'HH:mm:ss').add(23, 'hour'), 'minute'),
				status: 'pending',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '6',
				attendeeId: '2',
				type: 'booked',
				skill: 'photoshop',
				startTime: dayjs('15:00:00', 'HH:mm:ss').add(8, 'day').format(),
				endTime: dayjs('16:00:00', 'HH:mm:ss').add(8, 'day').format(),
				duration: dayjs('16:00:00', 'HH:mm:ss')
					.add(8, 'day')
					.diff(dayjs('15:00:00', 'HH:mm:ss').add(8, 'day'), 'minute'),
				status: 'approved',
				message: 'hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// mentee past
			{
				accountId: '1',
				attendeeId: '2',
				type: 'booked',
				skill: 'storytelling',
				startTime: dayjs('12:45:00', 'HH:mm:ss').subtract(150, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').subtract(149, 'day').format(), //~ 49hr
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.subtract(149, 'day')
					.diff(dayjs('12:45:00', 'HH:mm:ss').subtract(150, 'day'), 'minute'),
				status: 'approved',
				message: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('12:30:00', 'HH:mm:ss').subtract(120, 'day').format(),
				endTime: dayjs('13:30:00', 'HH:mm:ss').subtract(120, 'day').format(),
				duration: dayjs('13:30:00', 'HH:mm:ss')
					.subtract(120, 'day')
					.diff(dayjs('12:30:00', 'HH:mm:ss').subtract(120, 'day'), 'minute'),
				status: 'approved',
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: '2',
				type: 'booked',
				skill: 'java',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(110, 'day').format(),
				endTime: dayjs('10:30:00', 'HH:mm:ss').subtract(110, 'day').format(),
				duration: dayjs('10:30:00', 'HH:mm:ss')
					.subtract(110, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(110, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('13:00:00', 'HH:mm:ss').subtract(80, 'day').format(),
				endTime: dayjs('14:45:00', 'HH:mm:ss').subtract(80, 'day').format(),
				duration: dayjs('14:45:00', 'HH:mm:ss')
					.subtract(80, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').subtract(80, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('12:30:00', 'HH:mm:ss').subtract(64, 'day').format(),
				endTime: dayjs('13:30:00', 'HH:mm:ss').subtract(64, 'day').format(),
				duration: dayjs('13:30:00', 'HH:mm:ss')
					.subtract(64, 'day')
					.diff(dayjs('12:30:00', 'HH:mm:ss').subtract(64, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: '2',
				type: 'booked',
				skill: 'java',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(56, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(56, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(56, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(56, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: '2',
				type: 'booked',
				skill: 'java',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(49, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(49, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(49, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(49, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('13:00:00', 'HH:mm:ss').subtract(45, 'day').format(),
				endTime: dayjs('14:45:00', 'HH:mm:ss').subtract(45, 'day').format(),
				duration: dayjs('14:45:00', 'HH:mm:ss')
					.subtract(45, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').subtract(45, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('13:00:00', 'HH:mm:ss').subtract(38, 'day').format(),
				endTime: dayjs('14:45:00', 'HH:mm:ss').subtract(38, 'day').format(),
				duration: dayjs('14:45:00', 'HH:mm:ss')
					.subtract(38, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').subtract(38, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('12:30:00', 'HH:mm:ss').subtract(29, 'day').format(),
				endTime: dayjs('13:30:00', 'HH:mm:ss').subtract(29, 'day').format(),
				duration: dayjs('13:30:00', 'HH:mm:ss')
					.subtract(29, 'day')
					.diff(dayjs('12:30:00', 'HH:mm:ss').subtract(29, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: '2',
				type: 'booked',
				skill: 'java',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(28, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(28, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(28, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(28, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '1',
				attendeeId: '2',
				type: 'booked',
				skill: 'storytelling',
				startTime: dayjs('15:00:00', 'HH:mm:ss').subtract(25, 'day').format(),
				endTime: dayjs('16:00:00', 'HH:mm:ss').subtract(25, 'day').format(),
				duration: dayjs('16:00:00', 'HH:mm:ss')
					.subtract(25, 'day')
					.diff(dayjs('15:00:00', 'HH:mm:ss').subtract(25, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('13:00:00', 'HH:mm:ss').subtract(24, 'day').format(),
				endTime: dayjs('14:45:00', 'HH:mm:ss').subtract(24, 'day').format(),
				duration: dayjs('14:45:00', 'HH:mm:ss')
					.subtract(24, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').subtract(24, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('12:30:00', 'HH:mm:ss').subtract(22, 'day').format(),
				endTime: dayjs('13:30:00', 'HH:mm:ss').subtract(22, 'day').format(),
				duration: dayjs('13:30:00', 'HH:mm:ss')
					.subtract(22, 'day')
					.diff(dayjs('12:30:00', 'HH:mm:ss').subtract(22, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: '2',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('12:30:00', 'HH:mm:ss').subtract(8, 'day').format(),
				endTime: dayjs('13:30:00', 'HH:mm:ss').subtract(8, 'day').format(),
				duration: dayjs('13:30:00', 'HH:mm:ss')
					.subtract(8, 'day')
					.diff(dayjs('12:30:00', 'HH:mm:ss').subtract(8, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: '2',
				type: 'booked',
				skill: 'java',
				startTime: dayjs('09:00:00', 'HH:mm:ss').subtract(7, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').subtract(7, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.subtract(7, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').subtract(7, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '1',
				attendeeId: '2',
				type: 'booked',
				skill: 'storytelling',
				startTime: dayjs('15:00:00', 'HH:mm:ss').subtract(4, 'day').format(),
				endTime: dayjs('16:00:00', 'HH:mm:ss').subtract(4, 'day').format(),
				duration: dayjs('16:00:00', 'HH:mm:ss')
					.subtract(4, 'day')
					.diff(dayjs('15:00:00', 'HH:mm:ss').subtract(4, 'day'), 'minute'),
				status: 'approved',
				message: 'hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// user 6 -- Heather available
			{
				accountId: '6',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:30:00', 'HH:mm:ss').add(3, 'day').format(), //start with 4 temp
				endTime: dayjs('14:30:00', 'HH:mm:ss').add(3, 'day').format(),
				duration: dayjs('14:30:00', 'HH:mm:ss')
					.add(3, 'day')
					.diff(dayjs('13:30:00', 'HH:mm:ss').add(3, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '6',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:30:00', 'HH:mm:ss').add(10, 'day').format(),
				endTime: dayjs('14:30:00', 'HH:mm:ss').add(10, 'day').format(),
				duration: dayjs('14:30:00', 'HH:mm:ss')
					.add(10, 'day')
					.diff(dayjs('13:30:00', 'HH:mm:ss').add(10, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '6',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:30:00', 'HH:mm:ss').add(17, 'day').format(),
				endTime: dayjs('14:30:00', 'HH:mm:ss').add(17, 'day').format(),
				duration: dayjs('14:30:00', 'HH:mm:ss')
					.add(17, 'day')
					.diff(dayjs('13:30:00', 'HH:mm:ss').add(17, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '6',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:30:00', 'HH:mm:ss').add(24, 'day').format(),
				endTime: dayjs('14:30:00', 'HH:mm:ss').add(24, 'day').format(),
				duration: dayjs('14:30:00', 'HH:mm:ss')
					.add(24, 'day')
					.diff(dayjs('13:30:00', 'HH:mm:ss').add(24, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// past for the belt
			{
				accountId: '6',
				attendeeId: '3',
				type: 'booked',
				skill: 'communication',
				startTime: dayjs('13:30:00', 'HH:mm:ss').subtract(170, 'day').format(),
				endTime: dayjs('14:30:00', 'HH:mm:ss').subtract(165, 'day').format(), //~121 hr
				duration: dayjs('14:30:00', 'HH:mm:ss')
					.subtract(165, 'day')
					.diff(dayjs('13:30:00', 'HH:mm:ss').subtract(170, 'day'), 'minute'),
				status: 'approved',
				message: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// user 7 -- Aisha
			// available
			{
				accountId: '7',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('15:45:00', 'HH:mm:ss').add(1, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').add(1, 'day').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.add(1, 'day')
					.diff(dayjs('15:45:00', 'HH:mm:ss').add(1, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '7',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('15:45:00', 'HH:mm:ss').add(8, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').add(8, 'day').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.add(8, 'day')
					.diff(dayjs('15:45:00', 'HH:mm:ss').add(8, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '7',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('15:45:00', 'HH:mm:ss').add(15, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').add(15, 'day').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.add(15, 'day')
					.diff(dayjs('15:45:00', 'HH:mm:ss').add(15, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '7',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('15:45:00', 'HH:mm:ss').add(22, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').add(22, 'day').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.add(22, 'day')
					.diff(dayjs('15:45:00', 'HH:mm:ss').add(22, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// past for the belt
			{
				accountId: '7',
				attendeeId: '3',
				type: 'booked',
				skill: 'communication',
				startTime: dayjs('15:45:00', 'HH:mm:ss').subtract(160, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').subtract(143, 'day').format(), //~450 hr
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.subtract(143, 'day')
					.diff(dayjs('15:45:00', 'HH:mm:ss').subtract(160, 'day'), 'minute'),
				status: 'approved',
				message: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// John Doe Availability
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(29, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(29, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(29, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(29, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(36, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(36, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(36, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(36, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(43, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(43, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(43, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(43, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(50, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(50, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(50, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(50, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			//John Doe upcoming mentor
			{
				accountId: '3',
				attendeeId: '4',
				type: 'booked',
				skill: 'react',
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(1, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(1, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(1, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(1, 'day'), 'minute'),
				status: 'approved',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '5',
				type: 'booked',
				skill: 'bash',
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(8, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(8, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(8, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(8, 'day'), 'minute'),
				status: 'approved',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '8',
				type: 'booked',
				skill: 'yoga',
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(15, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(15, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(15, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(15, 'day'), 'minute'),
				status: 'pending',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '6',
				type: 'booked',
				skill: 'react',
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(22, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(22, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(22, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(22, 'day'), 'minute'),
				status: 'pending',
				message: 'Hi',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// past for the belt
			{
				accountId: '3',
				attendeeId: '4',
				type: 'booked',
				skill: 'react',
				startTime: dayjs('13:00:00', 'HH:mm:ss').subtract(15, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss')
					.subtract(15, 'day')
					.subtract(4, 'hour')
					.format(), //  wrong subtract for pretty pie chart
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.subtract(15, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').subtract(15, 'day'), 'minute'),
				status: 'approved',
				message: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '8',
				type: 'booked',
				skill: 'react',
				startTime: dayjs('13:00:00', 'HH:mm:ss').subtract(30, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss')
					.subtract(30, 'day')
					.subtract(4, 'hour')
					.format(), //  wrong subtract for pretty pie chart
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.subtract(30, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').subtract(30, 'day'), 'minute'),
				status: 'approved',
				message: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: '8',
				type: 'booked',
				skill: 'react',
				startTime: dayjs('13:00:00', 'HH:mm:ss').subtract(45, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss')
					.subtract(45, 'day')
					.subtract(4, 'hour')
					.format(), //  wrong subtract for pretty pie chart
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.subtract(45, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').subtract(45, 'day'), 'minute'),
				status: 'approved',
				message: 'Hello',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// available for user 1 -- Brian
			{
				accountId: '1',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('16:15:00', 'HH:mm:ss').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss').diff(
					dayjs('16:15:00', 'HH:mm:ss'),
					'minute'
				),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '1',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('16:15:00', 'HH:mm:ss').add(30, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').add(30, 'day').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.add(30, 'day')
					.diff(dayjs('16:15:00', 'HH:mm:ss').add(30, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '1',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('16:15:00', 'HH:mm:ss').add(60, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').add(60, 'day').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.add(60, 'day')
					.diff(dayjs('16:15:00', 'HH:mm:ss').add(60, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '1',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('16:15:00', 'HH:mm:ss').add(90, 'day').format(),
				endTime: dayjs('17:00:00', 'HH:mm:ss').add(90, 'day').format(),
				duration: dayjs('17:00:00', 'HH:mm:ss')
					.add(90, 'day')
					.diff(dayjs('16:15:00', 'HH:mm:ss').add(90, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// available for user 3
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(1, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(1, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss').diff(
					dayjs('13:00:00', 'HH:mm:ss'),
					'minute'
				),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(8, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(8, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(8, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(8, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(15, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(15, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(15, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(15, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '3',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:00:00', 'HH:mm:ss').add(22, 'day').format(),
				endTime: dayjs('14:00:00', 'HH:mm:ss').add(22, 'day').format(),
				duration: dayjs('14:00:00', 'HH:mm:ss')
					.add(22, 'day')
					.diff(dayjs('13:00:00', 'HH:mm:ss').add(22, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// available for user 5 -- Shameka
			{
				accountId: '5',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('11:30:00', 'HH:mm:ss').add(5, 'day').format(),
				endTime: dayjs('12:30:00', 'HH:mm:ss').add(5, 'day').format(),
				duration: dayjs('12:30:00', 'HH:mm:ss')
					.add(5, 'day')
					.diff(dayjs('11:30:00', 'HH:mm:ss').add(5, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('11:30:00', 'HH:mm:ss').add(12, 'day').format(),
				endTime: dayjs('12:30:00', 'HH:mm:ss').add(12, 'day').format(),
				duration: dayjs('12:30:00', 'HH:mm:ss')
					.add(12, 'day')
					.diff(dayjs('11:30:00', 'HH:mm:ss').add(12, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('11:30:00', 'HH:mm:ss').add(19, 'day').format(),
				endTime: dayjs('12:30:00', 'HH:mm:ss').add(19, 'day').format(),
				duration: dayjs('12:30:00', 'HH:mm:ss')
					.add(19, 'day')
					.diff(dayjs('11:30:00', 'HH:mm:ss').add(19, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '5',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('11:30:00', 'HH:mm:ss').add(26, 'day').format(),
				endTime: dayjs('12:30:00', 'HH:mm:ss').add(26, 'day').format(),
				duration: dayjs('12:30:00', 'HH:mm:ss')
					.add(26, 'day')
					.diff(dayjs('11:30:00', 'HH:mm:ss').add(26, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			// available for user 8 -- Olia
			{
				accountId: '8',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(1, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(1, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(1, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(1, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:30:00', 'HH:mm:ss').add(6, 'day').format(),
				endTime: dayjs('14:30:00', 'HH:mm:ss').add(6, 'day').format(),
				duration: dayjs('14:30:00', 'HH:mm:ss')
					.add(6, 'day')
					.diff(dayjs('13:30:00', 'HH:mm:ss').add(6, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('09:00:00', 'HH:mm:ss').add(8, 'day').format(),
				endTime: dayjs('10:00:00', 'HH:mm:ss').add(8, 'day').format(),
				duration: dayjs('10:00:00', 'HH:mm:ss')
					.add(8, 'day')
					.diff(dayjs('09:00:00', 'HH:mm:ss').add(8, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				accountId: '8',
				attendeeId: null,
				type: 'available',
				skill: null,
				startTime: dayjs('13:30:00', 'HH:mm:ss').add(13, 'day').format(),
				endTime: dayjs('14:30:00', 'HH:mm:ss').add(13, 'day').format(),
				duration: dayjs('14:30:00', 'HH:mm:ss')
					.add(13, 'day')
					.diff(dayjs('13:30:00', 'HH:mm:ss').add(13, 'day'), 'minute'),
				status: null,
				message: null,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Appointment', null, {})
	}
}
