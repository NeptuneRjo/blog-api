import { Request, Response } from 'express'
import { User } from '../models/models-exports'

// POST Requests
export const post_user = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await User.create(req.body)
		res.status(200).json({ message: 'User successfully created' })
	} catch (error) {
		res.status(400).json({ error })
	}
}

// DELETE Requests
export const delete_user = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params

	try {
		const user = await User.findOneAndDelete({ _id: id })
		res.status(200).json(user)
	} catch (error) {
		res.status(404).json({ error })
	}
}
