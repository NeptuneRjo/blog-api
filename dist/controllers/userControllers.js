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
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.logout_user = exports.login_user = exports.signup_user = exports.get_current_user = exports.get_user = void 0;
const models_exports_1 = require("../models/models-exports");
const mongoose_1 = require("mongoose");
// GET Requests
const get_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid id' });
    }
    const user = yield models_exports_1.User.findOne({ _id: id });
    if (!user) {
        return res.status(404).json({ error: 'No user found with that id' });
    }
    res.status(200).json({
        data: {
            user: {
                email: user === null || user === void 0 ? void 0 : user.email,
                id: user === null || user === void 0 ? void 0 : user._id,
                role: user === null || user === void 0 ? void 0 : user.role,
                username: user === null || user === void 0 ? void 0 : user.username,
            },
        },
    });
});
exports.get_user = get_user;
const get_current_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req.user is type any to access the properties
    let user = req.user;
    if (req.user) {
        res.status(200).json({
            data: {
                user: {
                    email: user === null || user === void 0 ? void 0 : user.email,
                    id: user === null || user === void 0 ? void 0 : user._id,
                    role: user === null || user === void 0 ? void 0 : user.role,
                    username: user === null || user === void 0 ? void 0 : user.username,
                },
            },
        });
    }
    else {
        res.status(200).json({ data: req.user });
    }
});
exports.get_current_user = get_current_user;
// POST Requests
const signup_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfUser = yield models_exports_1.User.findOne({ email: req.body.email });
    if (checkIfUser) {
        return res.status(400).json({ error: 'This email is already registered ' });
    }
    else {
        models_exports_1.User.create(req.body)
            .then((user) => res.status(200).json({
            data: {
                user: {
                    email: user.email,
                    id: user._id,
                    role: user.role,
                    username: user.username,
                },
            },
        }))
            .catch(() => res.status(400).json({ error: 'Unable to sign up user' }));
    }
});
exports.signup_user = signup_user;
const login_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.user;
    res.status(200).json({
        data: {
            user: {
                email: user === null || user === void 0 ? void 0 : user.email,
                id: user === null || user === void 0 ? void 0 : user._id,
                role: user === null || user === void 0 ? void 0 : user.role,
                username: user === null || user === void 0 ? void 0 : user.username,
            },
        },
    });
});
exports.login_user = login_user;
const logout_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout((err) => {
        if (err) {
            return res.status(400).json({ error: 'Error logging out user' });
        }
        res.status(200).json({ data: req.user });
    });
});
exports.logout_user = logout_user;
// DELETE Requests
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid id' });
    }
    const user = yield models_exports_1.User.findOneAndDelete({ _id: id });
    if (!user) {
        return res.status(404).json({ error: 'No user found with this id' });
    }
    res.status(200).json({ data: user });
});
exports.delete_user = delete_user;
