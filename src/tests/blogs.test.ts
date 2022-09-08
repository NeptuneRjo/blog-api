import { blogRoutes } from '../routes/routes-exports'
import request from 'supertest'
import express from 'express'
import 'jest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoConfigTesting'
import Blog from '../models/blogModel'
import { fakeBlogData, newBlog } from './fixtures'
import 'dotenv/config'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/api/blogs', blogRoutes)

const server = request.agent('http://localhost:4000')

describe('MongoMemoryServer', () => {
	beforeAll(async () => {
		const mongoServer = await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})

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

		beforeAll(async () => {
			const newBlog = await Blog.create(fakeBlogData)

			id = JSON.stringify(newBlog?._id)
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

			it('POST blog when user is authorized', (done) => {
				server
					.post('/api/blogs')
					.send(fakeBlogData)
					.expect(201)
					.end((err, res) => {
						if (err) return done(err)
						done()
					})
			})
		})

		describe('unauthorized', () => {
			it('logout', (done) => {
				server
					.post('/api/users/logout')
					.expect(200)
					.end((err, res) => {
						if (err) return done(err)
						return done()
					})
			})

			it('does not POST blog when user is unauthorized', (done) => {
				server
					.post('/api/blogs')
					.send(fakeBlogData)
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
})
