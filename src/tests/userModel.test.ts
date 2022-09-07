import User from '../models/userModel'
import { fakeUserData, fakeFailUserData } from './fixtures'
import 'jest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoConfigTesting'

describe('User Model', () => {
	beforeAll(async () => {
		const mongoServer = await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})

	it('should create a user item successfully', async () => {
		const newBlog = await User.create(fakeUserData)

		expect(newBlog._id).toBeDefined()
		expect(newBlog.email).toBe(newBlog.email)
		expect(newBlog.role).toBe(newBlog.role)
		expect(newBlog.username).toBe(newBlog.username)
		expect(newBlog.password).toBe(newBlog.password)
	})

	it('should fail the user item without the required fields', async () => {
		const newBlog = new User()

		newBlog.validate((err) => {
			expect(err).not.toBe(null)
		})
	})

	it('should fail the user item with fields of wrong type', async () => {
		try {
			const newUser = new User(fakeFailUserData)
			await newUser.validate()
		} catch (error) {
			expect(error).not.toBe(null)
		}
	})
})
