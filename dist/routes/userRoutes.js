"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.route('/signup').post(userControllers_1.signup_user);
router.route('/login').post(userControllers_1.login_user);
router.route('/:id').get(userControllers_1.get_user).delete(userControllers_1.delete_user);
exports.default = router;
