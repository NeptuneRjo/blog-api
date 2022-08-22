import { Request, Response } from 'express'
import { Blog } from '../models/models-exports'
import { Types } from 'mongoose'

// GET Requests

export const get_all_blogs = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const blogs = await Blog.find({})

	if (!blogs) {
		return res.status(404).json({ error: 'Unable to find any blogs' })
	}

	res.status(200).json({ data: blogs })
}

export const get_blog = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid id' })
	}

	const blog = await Blog.findById(id)

	if (!blog) {
		return res.status(404).json({ error: 'No blog found with that id' })
	}

	res.status(200).json({ data: blog })
}

// POST Requests

export const post_blog = async (req: Request, res: Response): Promise<void> => {
	const { title, body, author } = req.body

	Blog.create({ title, body, author })
		.then((blog) => res.status(201).json({ data: blog }))
		.catch((err) => res.status(400).json({ error: 'Could not create blog' }))
}

// PATCH Requests

export const patch_blog = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid id' })
	}

	const blog = await Blog.findOneAndUpdate({ _id: id }, req.body)
	const updatedBlog = await Blog.findById(id)

	if (!blog) {
		return res.status(404).json({ error: 'No blog found with this id' })
	}
	if (!updatedBlog) {
		return res.status(404).json({ error: 'No blog found with this id' })
	}

	res.status(200).json({ data: updatedBlog })
}

// DELETE Requests

export const delete_blog = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid id' })
	}

	const blog = await Blog.findOneAndDelete({ _id: id })

	if (!blog) {
		return res.status(404).json({ error: 'No blog found with this id' })
	}

	res.status(200).json({ data: blog })
}
