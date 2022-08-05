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
exports.delete_blog = exports.patch_blog = exports.post_blog = exports.get_blog = exports.get_all_blogs = void 0;
const models_exports_1 = require("../models/models-exports");
const mongoose_1 = require("mongoose");
// GET Requests
const get_all_blogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield models_exports_1.Blog.find({});
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.get_all_blogs = get_all_blogs;
const get_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No workout found' });
    }
    try {
        const blog = yield models_exports_1.Blog.findById(req.params.id);
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.get_blog = get_blog;
// POST Requests
const post_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, author } = req.body;
    try {
        const blog = yield models_exports_1.Blog.create({ title, body, author });
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.post_blog = post_blog;
// PATCH Requests
const patch_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No blog found' });
    }
    try {
        const blog = yield models_exports_1.Blog.findOneAndUpdate({ _id: id }, req.body);
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.patch_blog = patch_blog;
// DELETE Requests
const delete_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No workout found' });
    }
    try {
        const blog = yield models_exports_1.Blog.findOneAndDelete({ _id: id });
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.delete_blog = delete_blog;
