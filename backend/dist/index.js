"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const notes_route_1 = __importDefault(require("./routes/notes.route"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const PORT = 5000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send(`Hello Notely User!`);
});
app.use((req, res, next) => {
    console.log("Request path:", req.path);
    next();
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://notely-notes-app-g9bb.vercel.app"],
    // origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use("/api/auth", auth_route_1.default);
app.use("/api/notes", auth_middleware_1.default, notes_route_1.default);
app.use("/api/user", auth_middleware_1.default, user_routes_1.default);
console.log("Router mounted");
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
