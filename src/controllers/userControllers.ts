import { NextFunction, Request, Response } from 'express'
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

export const get_current_user = async (
	req: Request,
	res: Response
): Promise<void> => {
	let user = req.user as any

	if (req.user !== undefined) {
		res.json({
			user: {
				email: user?.email,
				id: user?._id,
				role: user?.role,
				username: user?.username,
			},
		})
	} else {
		res.json({ user })
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

export const login_user = async (
	req: Request,
	res: Response
): Promise<void> => {
	let user = req.user as any

	if (req.user) {
		res.status(200).json({
			email: user.email,
			id: user._id,
			role: user.role,
			username: user.username,
		})
	} else {
		res.status(400).json({ user })
	}
}

export const logout_user = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | NextFunction> => {
	req.logout((err) => {
		if (err) return next(err)
		res.status(200).json(req.user)
	})
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
