import 'dotenv/config'
import { connect, connection } from 'mongoose'

connect(`${process.env.MONGO_URI}`)

connection.on('error', console.error.bind(console, 'mongo connection errorr'))
