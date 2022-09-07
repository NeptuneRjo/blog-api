import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, connection } from 'mongoose'

let mongoServer: null | MongoMemoryServer = null

export const initializeMongoServer = async () => {
	mongoServer = await MongoMemoryServer.create()
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

export const deinitializeMongoServer = async () => {
	if (mongoServer) {
		await connection.dropDatabase()
		await connection.close()
		await mongoServer.stop()
	}
}

export const dropCollections = async () => {
	if (mongoServer) {
		const collections = await connection.db.collections()

		for (let collection of collections) {
			await collection.drop()
		}
	}
}
