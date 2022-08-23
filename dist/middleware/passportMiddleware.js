"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportLocal = void 0;
const passport_local_1 = require("passport-local");
const models_exports_1 = require("../models/models-exports");
const bcryptjs_1 = require("bcryptjs");
const passport_1 = __importDefault(require("passport"));
const message = 'Incorrect password';
function passportLocal() {
    passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        models_exports_1.User.findOne({ email }, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, user);
            if (password !== user.password) {
                (0, bcryptjs_1.compare)(password, user.password, (err, res) => {
                    if (res) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: message });
                    }
                });
            }
        });
    }));
    passport_1.default.serializeUser((id, done) => done(null, id));
    passport_1.default.deserializeUser((id, done) => {
        models_exports_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
exports.passportLocal = passportLocal;
