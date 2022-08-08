import { Router } from 'express'
import passport from 'passport'
import {
	post_user,
	delete_user,
	get_user,
} from '../controllers/userControllers'
const router = Router()

router.route('/').post(post_user)
router
	.route('/login')
	.post(passport.authenticate('local'), (req, res, next) => {
		res.status(200).json({ msg: 'authenticated', user: req.user })
	})
router.route('/:id').get(get_user).delete(delete_user)

export default router
