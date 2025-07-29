"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatenote = void 0;
const validatenote = (req, res, next) => {
    if (req.method === "DELETE")
        return next();
    const { title, synopsis, content, isPublic } = req.body;
    if (!title || !synopsis || !content || !isPublic) {
        return res.status(400).json({ message: "All fields are required." });
    }
    next();
};
exports.validatenote = validatenote;
exports.default = exports.validatenote;
