"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogModel = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        require: true,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    comments: {
        type: Array,
        default: [],
    },
});
const Blog = (0, mongoose_1.model)('Blog', blogModel);
exports.default = Blog;
