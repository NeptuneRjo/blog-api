import { Request, Response, NextFunction } from 'express'

const checkIfUserAuthed = (
	req: Request,
	res: Response,
	next: NextFunction
): void | NextFunction => {
	if (req.user) {
		next()
	} else {
		res.status(401).json({ error: 'Must log in before accessing this content' })
	}
}

export default checkIfUserAuthed
