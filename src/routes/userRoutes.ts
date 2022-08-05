import { Router } from 'express'
import {
	post_user,
	delete_user,
	get_user,
} from '../controllers/userControllers'
const router = Router()

router.route('/').post(post_user)
router.route('/:id').get(get_user).delete(delete_user)

export default router
