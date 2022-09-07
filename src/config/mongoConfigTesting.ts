import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, connection } from 'mongoose'

const initializeMongoServer = async () => {
	const mongoServer = await MongoMemoryServer.create()
	const mongoUri = mongoServer.getUri()

	connect(mongoUri)

	connection.on('error', (e) => {
		if (e.message.code === 'ETIMEDOUT') {
			console.log(e)
			connect(mongoUri)
		}
		console.log(e)
	})
}

export default initializeMongoServer
