import { Request, Response, NextFunction } from 'express'

const checkIfUserAuthed = (
	req: Request,
	res: Response,
	next: NextFunction
): void | NextFunction => {
	const user = req.user as any

	if (user === undefined) {
		res.status(401).json({ error: 'Must log in before accessing this content' })
	}

	if (user?.role === 'Admin') {
		next()
	} else if (user?.role === 'User') {
		res
			.status(403)
			.json({ error: 'You are not authorized to access this content' })
	}
}

export default checkIfUserAuthed
