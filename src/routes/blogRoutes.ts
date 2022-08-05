import { Router } from 'express'
import {
	get_all_blogs,
	get_blog,
	post_blog,
	delete_blog,
	patch_blog,
} from '../controllers/blogControllers'

const router = Router()

router.route('/').get(get_all_blogs).post(post_blog)
router.route('/:id').get(get_blog).patch(patch_blog).delete(delete_blog)

export default router
