"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.default, user_controller_1.getUserProfile);
router.patch("/user/:id", auth_middleware_1.default, upload_1.default.single("profileImage"), user_controller_1.updateUserProfile);
// router.patch("/user/:id", authenticateToken, updateUserProfile);
router.patch("/password", auth_middleware_1.default, user_controller_1.updateUserPassword);
router.get("/notes", auth_middleware_1.default, user_controller_1.getAllUserNotes);
router.get("/pinned", auth_middleware_1.default, user_controller_1.getPinnedNotes);
router.get("/trash", auth_middleware_1.default, user_controller_1.getAllDeletedNotes);
exports.default = router;
