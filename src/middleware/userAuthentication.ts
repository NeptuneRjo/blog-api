import { Request, Response, NextFunction } from 'express'

const checkIfUserAuthed = (
	req: Request,
	res: Response,
	next: NextFunction
): void | NextFunction => {
	const user = req.user as any
	switch (req.user) {
		case undefined:
			res
				.status(401)
				.json({ error: 'Must log in before accessing this content' })
		case user.role === 'Admin':
			next()
		case user.role === 'User':
			res
				.status(403)
				.json({ error: 'You are not authorized to access this content' })
		default:
			res
				.status(401)
				.json({ error: 'Must log in before accessing this content' })
	}
}

export default checkIfUserAuthed
