import express from 'express'
import { connect } from 'mongoose'
import { passportLocal } from './middleware/middleware-exports'
import passport from 'passport'
import 'dotenv/config'

import { blogRoutes, userRoutes } from './routes/routes-exports'

const app = express()

// <-- Middleware -->
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// passport
passport.use(passportLocal)

// <-- Routes -->
app.get('/', (req, res) => res.redirect('/api/users'))
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)

// <-- DB & App start -->
const port = process.env.PORT || 3000

connect(`${process.env.MONGO_URI}`)
	.then(() =>
		app.listen(port, () =>
			console.log('Connected to DB and listening on port:', port)
		)
	)
	.catch((err) => console.log(err))
