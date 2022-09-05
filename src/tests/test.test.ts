import { blogRoutes, userRoutes } from '../routes/routes-exports'
import request from 'supertest'
import express from 'express'
import * as jest from 'jest'

const app = express()

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Hello World'))
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)

describe('GET /api/blogs', () => {
	it('responds with json', (done) => {
		request(app)
			.get('/api/blogs')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done())
	})
})
