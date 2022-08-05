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
exports.delete_user = exports.post_user = void 0;
const models_exports_1 = require("../models/models-exports");
// POST Requests
const post_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_exports_1.User.create(req.body);
        res.status(200).json({ message: 'User successfully created' });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.post_user = post_user;
// DELETE Requests
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_exports_1.User.findOneAndDelete({ _id: id });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.delete_user = delete_user;
