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

beforeAll(async () => {
	// connect to database
	// using sequelize.sync({force: true}): adds a DROP TABLE IF EXISTS before trying to create the table
	// do this so db table clears on start of each test
	// await db.sequelize.sync();
	await db.sequelize.sync({ force: true })
	await User.create({
		accountId: '1',
		password: bcrypt.hashSync('1', 8),
		userName: '1',
		firstName: 'Brian',
		lastName: 'Bender',
		email: 'brian.o.bender@citi.com',
		darkModeEnabled: false,
		appointments: JSON.stringify([]),
		userProfile: JSON.stringify({
			userName: '1',
			firstName: 'Brian',
			lastName: 'Bender',
			email: 'brian.o.bender@citi.com',
			roles: ['user'],
			jobClassification: 'Apps Development Group Manager',
			position: 'SVP',
			locationStreet: '3800 CITIGROUP CENTER DRIVE ',
			locationCity: 'Tampa FL - Florida US 33610-9122',
			employeeId: 'bb22333'
		}),
		mentorProfile: JSON.stringify({
			totalMentorHours: '15',
			skills: ['bash', 'python']
		}),
		menteeProfile: JSON.stringify({
			totalMenteeHours: '15'
		}),
		metaData: JSON.stringify({}),
		createdAt: new Date(),
		updatedAt: new Date()
	})
})

describe('auth routes tests...', () => {
	it('create refresh token successfully', async () => {
		let [results] = await db.sequelize.query(
			`SELECT * FROM "Users" WHERE "accountId"='1'`
		)
		const user = results[0]
		const token = await RefreshToken.createToken(user)
		;[results] = await db.sequelize.query(`SELECT * FROM "RefreshTokens"`)
		expect(results[0].token).toBe(token)
	})

	it('create multible valid refresh tokens for a single user should be denied', async () => {
		let [results] = await db.sequelize.query(
			`SELECT * FROM "Users" WHERE "accountId"='1'`
		)
		const user = results[0]
		// attempt a second createToken when for same user
		const tokenErrorMessage = await RefreshToken.createToken(user)

		expect(tokenErrorMessage).toMatch(
			`insert or update on table "RefreshTokens" violates foreign key constraint "RefreshTokens_id_fkey"`
		)
	})

	it('successfully destroy token', async () => {
		// destroy token returns 1 if successful
		expect(await RefreshToken.destroy({ where: { userId: '1' } })).toBe(1)
	})
})

afterAll(async () => {
	return await db.sequelize.close()
})
