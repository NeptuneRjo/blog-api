"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogControllers_1 = require("../controllers/blogControllers");
const middleware_exports_1 = require("../middleware/middleware-exports");
const router = (0, express_1.Router)();
router.route('/').get(blogControllers_1.get_all_blogs).post(middleware_exports_1.checkIfUserAuthed, blogControllers_1.post_blog);
router
    .route('/:id')
    .get(blogControllers_1.get_blog)
    .patch(blogControllers_1.patch_blog)
    .delete(middleware_exports_1.checkIfUserAuthed, blogControllers_1.delete_blog);
exports.default = router;
