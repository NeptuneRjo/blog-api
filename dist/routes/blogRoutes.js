"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route('/')
    .get((req, res) => res.json({ msg: 'get blogs' }))
    .post((req, res) => res.json({ msg: 'post blog' }));
router
    .route('/:id')
    .get((req, res) => res.json({ msg: `get ${req.params.id}` }))
    .patch((req, res) => res.json({ msg: `patch ${req.params.id}` }))
    .delete((req, res) => res.json({ msg: `delete ${req.params.id}` }));
exports.default = router;
