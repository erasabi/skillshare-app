const db = require('../database')

const mockUsers = [
	{
		accountId: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'example@example.com',
		password: 'Test123!'
	}
]

beforeAll(async () => {
	// connect to database
	// using sequelize.sync({force: true}): adds a DROP TABLE IF EXISTS before trying to create the table
	await db.sequelize.sync({ force: true })
})

it('get User by ID without returning password', async () => {
	expect.assertions(1)
	let mockUser = mockUsers[0]
	delete mockUser.password
	const request = await db.User.findOne({
		attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'id'] },
		where: { accountId: mockUsers[0].accountId }
	})
	expect(request.dataValues).toEqual(mockUser)
})

afterAll(async () => {
	await db.sequelize.close()
})
