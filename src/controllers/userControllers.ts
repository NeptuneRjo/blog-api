import { NextFunction, Request, Response } from 'express'
import { User } from '../models/models-exports'
import { Types } from 'mongoose'

// GET Requests
export const get_user = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid id' })
	}

	const user = await User.findOne({ _id: id })

	if (!user) {
		return res.status(404).json({ error: 'No user found with that id' })
	}

	res.status(200).json({
		data: {
			user: {
				email: user?.email,
				id: user?._id,
				role: user?.role,
				username: user?.username,
			},
		},
	})
}

export const get_current_user = async (
	req: Request,
	res: Response
): Promise<void> => {
	// req.user is type any to access the properties
	let user = req.user as any

	if (req.user) {
		res.status(200).json({
			data: {
				user: {
					email: user?.email,
					id: user?._id,
					role: user?.role,
					username: user?.username,
				},
			},
		})
	} else {
		res.status(200).json({ data: req.user })
	}
}

// POST Requests
export const signup_user = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const checkIfUser = await User.findOne({ email: req.body.email })

	if (checkIfUser) {
		return res.status(400).json({ error: 'This email is already registered ' })
	} else {
		User.create(req.body)
			.then((user) =>
				res.status(200).json({
					data: {
						user: {
							email: user.email,
							id: user._id,
							role: user.role,
							username: user.username,
						},
					},
				})
			)
			.catch(() => res.status(406).json({ error: 'Unable to sign up user' }))
	}
}

export const login_user = async (
	req: Request,
	res: Response
): Promise<void> => {
	let user = req.user as any

	res.status(200).json({
		data: {
			user: {
				email: user?.email,
				id: user?._id,
				role: user?.role,
				username: user?.username,
			},
		},
	})
}

export const logout_user = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | Response> => {
	req.logout((err) => {
		if (err) {
			return res.status(400).json({ error: 'Error logging out user' })
		}

		res.status(200).json({ data: req.user })
	})
}

// DELETE Requests
export const delete_user = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { id } = req.params

	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid id' })
	}

	const user = await User.findOneAndDelete({ _id: id })

	if (!user) {
		return res.status(404).json({ error: 'No user found with this id' })
	}

	res.status(200).json({ data: user })
}
