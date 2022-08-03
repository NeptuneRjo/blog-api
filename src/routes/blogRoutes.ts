import { Router } from 'express'

const router = Router()

router
	.route('/')
	.get((req, res) => res.json({ msg: 'get blogs' }))
	.post((req, res) => res.json({ msg: 'post blog' }))

router
	.route('/:id')
	.get((req, res) => res.json({ msg: `get ${req.params.id}` }))
	.patch((req, res) => res.json({ msg: `patch ${req.params.id}` }))
	.delete((req, res) => res.json({ msg: `delete ${req.params.id}` }))

export default router
