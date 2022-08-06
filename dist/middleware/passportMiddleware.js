"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const models_exports_1 = require("../models/models-exports");
const passportLocalStrategy = new passport_local_1.Strategy((username, password, done) => {
    models_exports_1.User.findOne({ email: username }, (err, user) => {
        if (err)
            return done(err);
        if (!user)
            return done(null, false);
        if (!user.verifyPassword(password))
            return done(null, false);
        return done(null, user);
    });
});
exports.default = passportLocalStrategy;
