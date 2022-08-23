"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfUserAuthed = (req, res, next) => {
    const user = req.user;
    if (user === undefined) {
        res.status(401).json({ error: 'Must log in before accessing this content' });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === 'Admin') {
        next();
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'User') {
        res
            .status(403)
            .json({ error: 'You are not authorized to access this content' });
    }
};
exports.default = checkIfUserAuthed;
