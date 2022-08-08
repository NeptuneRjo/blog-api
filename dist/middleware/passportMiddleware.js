"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportLocal = void 0;
const passport_local_1 = require("passport-local");
const models_exports_1 = require("../models/models-exports");
const bcryptjs_1 = require("bcryptjs");
const message = 'Incorrect password';
exports.passportLocal = new passport_local_1.Strategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    console.log('local');
    models_exports_1.User.findOne({ email }, (err, user) => {
        if (err)
            return done(err);
        if (!user)
            return done(null, false);
        if (password !== user.password) {
            (0, bcryptjs_1.compare)(password, user.password, (err, res) => {
                if (res) {
                    console.log(res);
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: message });
                }
            });
        }
    });
});
