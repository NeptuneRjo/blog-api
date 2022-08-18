"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfUserAuthed = (req, res, next) => {
    const user = req.user;
    switch (req.user) {
        case undefined:
            res
                .status(401)
                .json({ error: 'Must log in before accessing this content' });
        case user.role === 'Admin':
            next();
        case user.role === 'User':
            res
                .status(403)
                .json({ error: 'You are not authorized to access this content' });
        default:
            res
                .status(401)
                .json({ error: 'Must log in before accessing this content' });
    }
};
exports.default = checkIfUserAuthed;
