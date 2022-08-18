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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const userModel = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please eneter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    role: {
        type: String,
        default: 'User',
    },
    username: {
        type: String,
        required: true,
    },
});
userModel.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield (0, bcryptjs_1.genSalt)();
        this.password = yield (0, bcryptjs_1.hash)(this.password, salt);
        next();
    });
});
const User = (0, mongoose_1.model)('User', userModel);
exports.default = User;
