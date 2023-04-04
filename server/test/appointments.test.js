const request = require('supertest')
const assert = require('assert')
const express = require('express')
const testApp = require('../app')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const db = require('../database')
const User = db.Users
const RefreshToken = db.RefreshToken
// const { QueryTypes } = require('@sequelize/core');
const { Op } = require('sequelize')

beforeAll(async () => {
	// connect to database
	// using sequelize.sync({force: true}): adds a DROP TABLE IF EXISTS before trying to create the table
	// do this so db table clears on start of each test
	// await db.sequelize.sync();
	// await db.sequelize.sync({ force: true });
	await db.sequelize.sync()
	// await db.Appointment.create({
	//     accountId: "1",
	//     type: "available",
	//     skill: "test",
	//     // attendeeId: "2",
	//     startTime: new Date("March 25, 2022 20:48:00"),
	//     endTime: new Date("March 25, 2022 21:15:00"),
	//     status: null,
	// }).catch(error => console.log(error))
	// await db.Appointment.create({
	//     accountId: "1",
	//     type: "mentor",
	//     skill: "test",
	//     // attendeeId: "2",
	//     startTime: new Date("March 26, 2022 20:48:00"),
	//     endTime: new Date("March 26, 2022 21:15:00"),
	//     status: "pending",
	// }).catch(error => console.log(error))
	// await db.Appointment.create({
	//     accountId: "1",
	//     type: "mentor",
	//     skill: "test",
	//     // attendeeId: "2",
	//     startTime: new Date("March 27, 2022 20:48:00"),
	//     endTime: new Date("March 27, 2022 21:15:00"),
	//     status: "pending",
	// }).catch(error => console.log(error))
})

describe('auth routes tests...', () => {
	// it('get appointments', async () => {
	//     let results = await db.sequelize.query(`SELECT * FROM "Appointments" WHERE "accountId"='1'`);
	//     const appointments = results[0];
	//     expect(appointments.length).toBe(3);
	// });

	// it('sort appointments by startTime', async () => {
	//     let results = await db.sequelize.query(`SELECT * FROM "Appointments" WHERE "accountId"='1' ORDER BY "startTime" DESC`);
	//     const appointments = results[0];
	//     expect(appointments.length).toBe(3);
	// });

	// it('add availabile appointment', async () => {
	//     await db.Appointment.create({
	//         accountId: "3",
	//         type: "available",
	//         startTime: new Date("March 5, 2022 20:48:00"),
	//         endTime: new Date("March 5, 2022 21:15:00"),
	//     }).catch(error => console.log(error))
	//     let results = await db.sequelize.query(`SELECT * FROM "Appointments" WHERE "accountId"='3'`);
	//     const appointments = results[0];
	//     expect(appointments.length).toBe(1);
	// });

	// it('book appointment', async () => {
	//     const appointmentId = 4
	//     const accountId = "3"

	//     let results = await db.Appointment.update(
	//         {
	//             attendeeId: accountId,
	//             status: 'pending',
	//             skill: 'test',
	//         },
	//         { where: {id: appointmentId} },
	//     );
	//     results = await db.sequelize.query(`SELECT * FROM "Appointments" WHERE "id"=${appointmentId}`);
	//     const appointment = results[0];
	//     expect(appointment.length).toBe(1);
	// });

	// it('get appointment by start time', async () => {
	//     const appointmentId = 4
	//     const accountId = "3"

	//     let results = await db.Appointment.findOne({
	//         where: {
	//             accountId: accountId,
	//             startTime: {
	//                 [Op.eq]: new Date("March 5, 2022 20:48:00"),
	//             }
	//         }
	//     });

	//     // const appointment = results[0];
	//     expect(results.id).toBe(appointmentId);
	// });

	it('test', async () => {
		const results = await db.sequelize.query(
			`SELECT * FROM "Users","Appointments"`
		)

		// const appointment = results[0];
		expect(true).toBe(true)
	})

	// it('add appointment', async () => {
	//     let results = await db.sequelize.query(`SELECT appointments FROM "Users" WHERE "accountId"='1'`);
	//     const appointments = results[0][0].appointments;
	//     appointments.push({
	//         type: "mentor",
	//         skill: "test",
	//         attendeeId: "2",
	//         timeStart: new Date("March 25, 2022 23:48:00"),
	//         timeEnd: new Date("March 25, 2022 20:15:00"),
	//         status: "Pending Confirmation",
	//     })
	//     const user = await db.Users.update(
	//         {
	//             appointments: appointments
	//         },
	//         {
	//             where: {
	//                 accountId: '1'
	//             }
	//         });
	//     results = await db.sequelize.query(`SELECT appointments FROM "Users" WHERE "accountId"='1'`);
	//     const start = new Date(results[0][0].appointments[0].timeStart);
	//     const end = new Date(results[0][0].appointments[0].timeStart).getTime();
	//     // const token = await RefreshToken.createToken(user);
	//     // [ results ] = await db.sequelize.query(`SELECT * FROM "RefreshTokens"`);
	//     expect(appointments.length).toBe(4);
	// });
})

afterAll(async () => {
	return await db.sequelize.close()
})
