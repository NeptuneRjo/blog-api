import { Schema, model } from 'mongoose'
import { genSalt, hash } from 'bcryptjs'

const userModel = new Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please eneter a password'],
		minlength: [6, 'Minimum password length is 6 characters'],
	},
	role: {
		type: String,
		default: 'User',
	},
	username: {
		type: String,
		required: true,
	},
})

userModel.pre('save', async function (next) {
	const salt = await genSalt()
	this.password = await hash(this.password, salt)

	next()
})

const User = model('User', userModel)

export default User
