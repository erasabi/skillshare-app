const request = require('supertest')
const assert = require('assert')
const express = require('express')
const testApp = require('../app')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const db = require('../database')
const User = db.Users

beforeAll(async () => {
	// connect to database
	// using sequelize.sync({force: true}): adds a DROP TABLE IF EXISTS before trying to create the table
	// do this so db table clears on start of each test
	await db.sequelize.sync({ force: true })
})

describe('auth routes tests...', () => {
	const requestMock = {}

	const registrationRequestMock = {
		username: 'testUserName',
		firstname: 'testUserFirstName',
		lastname: 'testLastName',
		email: 'testEmail',
		password: 'testPassword',
		roles: ['user'],
		jobClassification: 'testJobClassification',
		position: 'testPosition',
		locationStreet: 'testLocationStreet',
		locationCity: 'testLocationCity',
		employeeId: 'testemployeeId'
	}

	it('register user successfully', async () => {
		// testApp mocks apps configuration to tests routes
		await request(testApp)
			.post('/api/auth/signup')
			.send(registrationRequestMock)
			.expect(200)
	})

	it('registered user data matches submission data', async () => {
		const res = await User.findOne({
			where: {
				'userProfile.userName': registrationRequestMock.username
			}
		})

		// expect(res.dataValues).toEqual(mockUser);
		expect(res.dataValues).toEqual(
			expect.objectContaining(partialRegisteredUserMock)
		)
	})

	it('register existing user returns 400 error', async () => {
		await request(testApp)
			.post('/api/auth/signup')
			.send(registrationRequestMock)
			.expect(400)
	})

	it('register existing user returns 400 error', async () => {
		await request(testApp)
			.post('/api/auth/signup')
			.send(registrationRequestMock)
			.expect(400)
	})
})

afterAll(async () => {
	return await db.sequelize.close()
})
