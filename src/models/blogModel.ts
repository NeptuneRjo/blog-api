import { Schema, model } from 'mongoose'

const blogModel = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		require: true,
	},
	author: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
})

const Blog = model('Blog', blogModel)

export default Blog
