import { Router } from 'express'
import {
	signup_user,
	delete_user,
	get_user,
	login_user,
} from '../controllers/userControllers'
const router = Router()

router.route('/signup').post(signup_user)
router.route('/login').post(login_user)
router.route('/:id').get(get_user).delete(delete_user)

export default router
