"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserAuthed = exports.passportLocal = void 0;
var passportMiddleware_1 = require("./passportMiddleware");
Object.defineProperty(exports, "passportLocal", { enumerable: true, get: function () { return passportMiddleware_1.passportLocal; } });
var userAuthentication_1 = require("./userAuthentication");
Object.defineProperty(exports, "checkIfUserAuthed", { enumerable: true, get: function () { return __importDefault(userAuthentication_1).default; } });
