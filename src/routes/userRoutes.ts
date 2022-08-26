import { Router } from 'express'
import passport from 'passport'
import {
	signup_user,
	delete_user,
	get_user,
	login_user,
	logout_user,
	get_current_user,
} from '../controllers/userControllers'
const router = Router()

router.post('/signup', signup_user)
router.post('/login', passport.authenticate('local'), login_user)
router.post('/logout', logout_user)
router.get('/', get_current_user)

router.route('/:id').get(get_user).delete(delete_user)

export default router
