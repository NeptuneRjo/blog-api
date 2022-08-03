import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()

// <-- Middleware -->
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// <-- Routes -->
app.get('/', (req, res) => res.json({ msg: 'Hello World' }))

// <-- DB & App start -->
const port = process.env.PORT || 3000

mongoose
	.connect(`${process.env.MONGO_URI}`)
	.then(() =>
		app.listen(port, () =>
			console.log('Connected to DB and listening on port:', port)
		)
	)
	.catch((err) => console.log(err))
