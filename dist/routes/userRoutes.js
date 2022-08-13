"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.post('/signup', userControllers_1.signup_user);
router.post('/login', passport_1.default.authenticate('local'), userControllers_1.login_user);
router.post('/logout', userControllers_1.logout_user);
router.get('/', userControllers_1.get_current_user);
router.route('/:id').get(userControllers_1.get_user).delete(userControllers_1.delete_user);
exports.default = router;
