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
	let token: string
	let id: string

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

	describe('DELETE /api/blogs/:id', () => {
		createUser()
		loginUser()

		// Creates the blog to be deleted
		it('POST new blog', (done) => {
			server
				.post('/api/blogs')
				.send(newBlog)
				.query(token)
				.expect(201)
				.end((err, res) => {
					id = res.body.data._id
					if (err) return done(err)
					return done()
				})
		})

		it('DELETES blog', (done) => {
			server
				.delete(`/api/blogs/${id}`)
				.query(token)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})

	describe('GET /api/blogs', () => {
		it('GETS all blogs', (done) => {
			server
				.get('/api/blogs')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})

	describe('GET /api/blogs/:id', () => {
		createUser()
		loginUser()

		// Creates the blog to be found
		it('POST new blog', (done) => {
			server
				.post('/api/blogs')
				.send(newBlog)
				.query(token)
				.expect(201)
				.end((err, res) => {
					id = res.body.data._id
					if (err) return done(err)
					return done()
				})
		})

		it('GETS the blogs', (done) => {
			server
				.get(`/api/blogs/${id}`)
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})

	describe('PATCH /api/blogs/:id', () => {
		createUser()
		loginUser()

		// Creates the blog to be patched
		it('POST new blog', (done) => {
			server
				.post('/api/blogs')
				.send(newBlog)
				.query(token)
				.expect(201)
				.end((err, res) => {
					id = res.body.data._id
					if (err) return done(err)
					return done()
				})
		})

		it('PATCHes the blogs', (done) => {
			server
				.patch(`/api/blogs/${id}`)
				.send({ comments: [{ username: 'test', body: 'test' }] })
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})
})
