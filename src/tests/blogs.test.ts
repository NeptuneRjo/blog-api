import request from 'supertest'
import 'jest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoConfigTesting'
import Blog from '../models/blogModel'
import { fakeBlogData, newBlog } from './fixtures'
import 'dotenv/config'

const server = request.agent('http://localhost:4000')

describe('Blog Tests', () => {
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
					email: process.env.TEST_USER,
					password: process.env.TEST_PASSWORD,
				})
				.expect(200)
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

	describe('GET /api/blogs', () => {
		it('responds with json', (done) => {
			server
				.get('/api/blogs')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, () => done())
		})
	})

	describe('GET /api/blogs/:id', () => {
		let id: string | null = null

		loginUser()

		it('POST blog when user is authorized', (done) => {
			server
				.post('/api/blogs')
				.send(fakeBlogData)
				.expect(201)
				.end((err, res) => {
					if (err) return done(err)
					id = res.body.data._id
					done()
				})
		})

		it('responds with json', (done) => {
			server
				.get(`/api/blogs/${id}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, () => done())
		})
	})

	describe('POST /api/blogs', () => {
		describe('authorized', () => {
			loginUser()

			it('POST blog when user is authorized', (done) => {
				server
					.post('/api/blogs')
					.send(newBlog)
					.expect(201)
					.end((err, res) => {
						if (err) return done(err)
						done()
					})
			})
		})

		describe('unauthorized', () => {
			logoutUser()

			it('does not POST blog when user is unauthorized', (done) => {
				server
					.post('/api/blogs')
					.send(newBlog)
					.expect(401)
					.end((err, res) => {
						if (err) return done(err)
						done()
					})
			})
		})
	})

	describe('PATCH /api/blogs/:id', () => {
		let id: string | null = null

		beforeAll(async () => {
			const newBlog = await Blog.create(fakeBlogData)

			id = JSON.stringify(newBlog?._id)
		})

		it('patches blog and responds with JSON', (done) => {
			server
				.patch(`/api/blogs/${id}`)
				.send({
					comments: [{ body: 'dummy comment', username: 'dummyUsername' }],
				})
				.expect('Content-Type', /json/)
				.expect(200, () => done())
		})
	})

	describe('DELETE /api/blogs/:id', () => {
		describe('authorized', () => {
			let id: string | null = null

			loginUser()

			it('POST blog when user is authorized', (done) => {
				server
					.post('/api/blogs')
					.send(fakeBlogData)
					.expect(201)
					.end((err, res) => {
						if (err) return done(err)
						id = res.body.data._id
						done()
					})
			})

			it('DELETE blog when user is unauthorized', (done) => {
				server
					.delete(`/api/blogs/${id}`)
					.expect(200)
					.end((err, res) => {
						if (err) return done(err)
						done()
					})
			})
		})

		describe('unauthorized', () => {
			logoutUser()

			it('does not DELETE blog when user is unauthorized', (done) => {
				server
					.delete('/api/blogs/123')
					.expect(401)
					.end((err, res) => {
						if (err) return done(err)
						done()
					})
			})
		})
	})
})
