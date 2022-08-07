"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.login_user = exports.signup_user = exports.get_user = void 0;
const passport_1 = __importDefault(require("passport"));
const models_exports_1 = require("../models/models-exports");
// GET Requests
const get_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_exports_1.User.findOne({ _id: id });
        if (!user) {
            res.status(404).json({ error: 'No user found with this id.' });
        }
        else {
            res.status(200).json({ user: { email: user === null || user === void 0 ? void 0 : user.email } });
        }
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.get_user = get_user;
// POST Requests
const signup_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_exports_1.User.create(req.body);
        res.status(200).json({ message: 'User successfully created' });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.signup_user = signup_user;
const login_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local');
    res.status(201).json({ user: req === null || req === void 0 ? void 0 : req.user });
});
exports.login_user = login_user;
// DELETE Requests
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_exports_1.User.findOneAndDelete({ _id: id });
        if (!user) {
            res.status(404).json({ error: 'No user found with this id.' });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.delete_user = delete_user;
