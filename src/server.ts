import express from 'express'
import session from 'express-session'
import { connect } from 'mongoose'
import { passportLocal } from './middleware/middleware-exports'
import passport from 'passport'
import cors from 'cors'
import 'dotenv/config'

import { blogRoutes, userRoutes } from './routes/routes-exports'

const app = express()
app.use(
	cors({
		origin: [
			'https://neptunerjo.github.io/blog-api-frontend/',
			'https://neptunerjo.github.io',
			'https://neptunerjo.github.io/blog-api-frontend/#/',
			'https://neptunerjo.github.io/',
			'http://localhost:3000',
		],
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
		credentials: true,
	})
)

passportLocal() // Passport strategy and serialization

// <-- Middleware -->

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
	session({
		secret: process.env.WEB_SECRET as string,
		resave: true,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			sameSite: 'none',
			path: '/',
			secure: true,
			maxAge: 1 * 1000 * 100,
		},
	})
)

app.use(passport.initialize())
app.use(passport.session())

// <-- Routes -->
app.get('/', (req, res) => res.send('Hello World'))
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)

// <-- DB & App start -->
const port = process.env.PORT || 4000

connect(`${process.env.MONGO_URI}`)
	.then(() =>
		app.listen(port, () =>
			console.log('Connected to DB and listening on port:', port)
		)
	)
	.catch((err) => console.log(err))
