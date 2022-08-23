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
    const blogs = yield models_exports_1.Blog.find({});
    if (!blogs) {
        return res.status(404).json({ error: 'Unable to find any blogs' });
    }
    res.status(200).json({ data: blogs });
});
exports.get_all_blogs = get_all_blogs;
const get_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid id' });
    }
    const blog = yield models_exports_1.Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ error: 'No blog found with that id' });
    }
    res.status(200).json({ data: blog });
});
exports.get_blog = get_blog;
// POST Requests
const post_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_exports_1.Blog.create(req.body)
        .then((blog) => res.status(201).json({ data: blog }))
        .catch((err) => res.status(400).json({ error: 'Unable to create blog' }));
});
exports.post_blog = post_blog;
// PATCH Requests
const patch_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid id' });
    }
    const blog = yield models_exports_1.Blog.findOneAndUpdate({ _id: id }, req.body);
    const updatedBlog = yield models_exports_1.Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ error: 'No blog found with this id' });
    }
    if (!updatedBlog) {
        return res.status(404).json({ error: 'No blog found with this id' });
    }
    res.status(200).json({ data: updatedBlog });
});
exports.patch_blog = patch_blog;
// DELETE Requests
const delete_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid id' });
    }
    const blog = yield models_exports_1.Blog.findOneAndDelete({ _id: id });
    if (!blog) {
        return res.status(404).json({ error: 'No blog found with this id' });
    }
    res.status(200).json({ data: blog });
});
exports.delete_blog = delete_blog;
