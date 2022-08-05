"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').post((req, res) => res.json({ msg: 'post user' }));
router
    .route('/:id')
    .delete((req, res) => res.json({ msg: `delete ${req.params.id}` }));
exports.default = router;
