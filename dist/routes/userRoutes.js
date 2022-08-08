"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.route('/').post(userControllers_1.post_user);
router
    .route('/login')
    .post(passport_1.default.authenticate('local'), (req, res, next) => {
    res.status(200).json({ msg: 'authenticated', user: req.user });
});
router.route('/:id').get(userControllers_1.get_user).delete(userControllers_1.delete_user);
exports.default = router;
