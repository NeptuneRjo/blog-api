import { Request, Response } from 'express'
import { User } from '../models/models-exports'

// GET Requests
export const get_user = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params

	try {
		const user = await User.findOne({ _id: id })

		if (!user) {
			res.status(404).json({ error: 'No user found with this id.' })
		} else {
			res.status(200).json({ user: { email: user?.email } })
		}
	} catch (error) {
		res.status(404).json({ error })
	}
}

// POST Requests
export const signup_user = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = await User.create(req.body)
		res.status(200).json({ message: 'User successfully created' })
	} catch (error) {
		res.status(400).json({ error })
	}
}

export const logout_user = async (
	req: Request,
	res: Response
): Promise<void> => {
	let user = req.user as any

	if (req.user) {
		res.status(200).json({
			msg: 'User authenticated',
			user: { email: user.email, id: user._id },
		})
	} else {
		res.status(400).json({ msg: 'Unable to authenticate user' })
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

		if (!user) {
			res.status(404).json({ error: 'No user found with this id.' })
		} else {
			res.status(200).json(user)
		}
	} catch (error) {
		res.status(404).json({ error })
	}
}
