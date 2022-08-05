"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.route('/').post(userControllers_1.post_user);
router.route('/:id').delete(userControllers_1.delete_user);
exports.default = router;
