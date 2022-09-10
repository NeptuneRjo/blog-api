import request from 'supertest'
import 'jest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoConfigTesting'
import { fakeBlogData, newBlog } from './fixtures'
import 'dotenv/config'

const server = request.agent('http://localhost:4000')

describe('Blog Tests', () => {
	let token: any

	beforeAll(async () => {
		const mongoServer = await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})

	const loginUser = () => {
		it('login', (done) => {
			server
				.post('/api/users/login')
				.send({
					email: 'test1@user.com',
					password: 'testpassword',
				})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					token = res.body.token
					if (err) return done(err)
					return done()
				})
		})
	}

	// Signup returns 200 for a new user created
	//  OR will return 400 if user already exists
	const createUser = async () => {
		it('creates new user', (done) => {
			server
				.post('/api/users/signup')
				.send({
					email: 'test1@user.com',
					password: 'testpassword',
					username: 'testuser',
					role: 'Admin',
				})
				.set('Accept', 'application/json')
				.expect([200, 400])
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	}

	const logoutUser = () => {
		it('logout', (done) => {
			server
				.post('/api/users/logout')
				.expect(200)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	}

	describe('POST /api/blogs', () => {
		createUser()
		loginUser()

		it('POST new blog', (done) => {
			server
				.post('/api/blogs')
				.send(newBlog)
				.query(token)
				.expect(201)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})

	describe.skip('DELETE /api/blogs/:id', () => {})
})
