import request from 'supertest'
import 'jest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../../config/mongoConfigTesting'
import { newUser } from '../fixtures'
import 'dotenv/config'

const server = request.agent('http://localhost:4000')

describe('User tests', () => {
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

	const createUser = () => {
		it('signs up new user', (done) => {
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
					id = res.body.data.user.id
					return done()
				})
		})
	}

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
					if (err) return done(err)
					return done()
				})
		})
	}

	describe('POST /api/users/login', () => {
		createUser()

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
					if (err) return done(err)
					return done()
				})
		})
	})

	describe('POST /api/users/logout', () => {
		it('logout', (done) => {
			server
				.post('/api/users/logout')
				.expect(200)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})

	describe('GET /api/users', () => {
		it('responds with json', (done) => {
			server
				.get('/api/users')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})

	describe('GET /api/users/:id', () => {
		createUser()

		it('responds with json', (done) => {
			server
				.get(`/api/users/${id}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err)
					return done()
				})
		})
	})

	describe('POST /api/users/signup', () => {
		createUser()
	})
})
