import { blogRoutes } from '../routes/routes-exports'
import request from 'supertest'
import express from 'express'
import 'jest'
import mongoConfigTesting from '../config/mongoConfigTesting'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/api/blogs', blogRoutes)

describe('MongoMemoryServer', () => {
	beforeAll(async () => {
		const mongoServer = await mongoConfigTesting()
	})

	describe('GET /api/blogs', () => {
		it('responds with json', (done) => {
			request(app)
				.get('/api/blogs')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, () => done())
		})
	})
})
