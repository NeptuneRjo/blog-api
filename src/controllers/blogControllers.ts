import { Request, Response } from 'express'
import { Blog } from '../models/models-exports'
import { Types } from 'mongoose'

// GET Requests

export const get_all_blogs = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const blogs = await Blog.find({})
		res.status(200).json(blogs)
	} catch (error) {
		res.status(404).json({ error })
	}
}

export const get_blog = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No workout found' })
	}

	try {
		const blog = await Blog.findById(req.params.id)

		if (!blog) {
			res.status(404).json({ error: 'No blog found with this id.' })
		} else {
			res.status(200).json(blog)
		}

		res.status(200).json(blog)
	} catch (error) {
		res.status(404).json({ error })
	}
}

// POST Requests

export const post_blog = async (req: Request, res: Response): Promise<void> => {
	const { title, body, author } = req.body

	try {
		const blog = await Blog.create({ title, body, author })
		res.status(201).json(blog)
	} catch (error) {
		res.status(400).json({ error })
	}
}

// PATCH Requests

export const patch_blog = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No blog found' })
	}

	try {
		const blog = await Blog.findOneAndUpdate({ _id: id }, req.body)
		res.status(200).json(blog)
	} catch (error) {
		res.status(404).json({ error })
	}
}

// DELETE Requests

export const delete_blog = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No blog found' })
	}

	try {
		const blog = await Blog.findOneAndDelete({ _id: id })

		if (!blog) {
			res.status(404).json({ error: 'No blog found with this id.' })
		} else {
			res.status(200).json(blog)
		}

		res.status(200).json(blog)
	} catch (error) {
		res.status(404).json({ error })
	}
}
