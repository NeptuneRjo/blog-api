import express from 'express'
import session from 'express-session'
import { connect } from 'mongoose'
import { passportLocal } from './middleware/middleware-exports'
import bodyParser from 'body-parser'
import { User } from './models/models-exports'
import passport from 'passport'
import 'dotenv/config'

import { blogRoutes, userRoutes } from './routes/routes-exports'

const app = express()

// <-- Middleware -->
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
	session({
		secret: process.env.WEB_SECRET as string,
		resave: false,
		saveUninitialized: true,
	})
)
// app.use(bodyParser.json())

// passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(passportLocal)

passport.serializeUser((id, done) => done(null, id))

passport.deserializeUser((id, done) => {
	User.findById(id, (err: any, user: any) => {
		done(err, user)
	})
})

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
