"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = require("mongoose");
const middleware_exports_1 = require("./middleware/middleware-exports");
const passport_1 = __importDefault(require("passport"));
require("dotenv/config");
const routes_exports_1 = require("./routes/routes-exports");
const app = (0, express_1.default)();
(0, middleware_exports_1.passportLocal)(); // Passport strategy and serialization
// <-- Middleware -->
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: process.env.WEB_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// <-- Routes -->
app.get('/', (req, res) => res.redirect('/api/users'));
app.use('/api/users', routes_exports_1.userRoutes);
app.use('/api/blogs', routes_exports_1.blogRoutes);
// <-- DB & App start -->
const port = process.env.PORT || 3000;
(0, mongoose_1.connect)(`${process.env.MONGO_URI}`)
    .then(() => app.listen(port, () => console.log('Connected to DB and listening on port:', port)))
    .catch((err) => console.log(err));
