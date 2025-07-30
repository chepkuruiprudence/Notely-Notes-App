"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access token required." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && decoded !== null) {
            const user = decoded;
            console.log("Logged-in user:", user);
            req.user = user;
            return next();
        }
        else {
            return res.status(403).json({ message: "Invalid token payload format." });
        }
    }
    catch (err) {
        console.error("JWT verification error:", err);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};
exports.default = authenticateToken;
