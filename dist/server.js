"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app = (0, express_1.default)();
// <-- Middleware -->
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// <-- Routes -->
app.get('/', (req, res) => res.json({ msg: 'Hello World' }));
// <-- DB & App start -->
const port = process.env.PORT || 3000;
mongoose_1.default
    .connect(`${process.env.MONGO_URI}`)
    .then(() => app.listen(port, () => console.log('Connected to DB and listening on port:', port)))
    .catch((err) => console.log(err));
