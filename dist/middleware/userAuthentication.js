"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfUserAuthed = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.status(401).json({ error: 'Must log in before accessing this content' });
    }
};
exports.default = checkIfUserAuthed;
