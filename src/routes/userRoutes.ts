import { Router } from 'express'
const router = Router()

router.route('/').post((req, res) => res.json({ msg: 'post user' }))
router
	.route('/:id')
	.delete((req, res) => res.json({ msg: `delete ${req.params.id}` }))

export default router
