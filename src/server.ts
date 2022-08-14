import express from 'express'
import session from 'express-session'
import { connect } from 'mongoose'
import { passportLocal } from './middleware/middleware-exports'
import passport from 'passport'
import cors from 'cors'
import 'dotenv/config'

import { blogRoutes, userRoutes } from './routes/routes-exports'

const app = express()
app.use(cors)

passportLocal() // Passport strategy and serialization

// <-- Middleware -->
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
	session({
		secret: process.env.WEB_SECRET as string,
		resave: true,
		saveUninitialized: false,
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
