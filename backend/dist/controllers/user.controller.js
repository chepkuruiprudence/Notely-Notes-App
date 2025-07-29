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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPinnedNotes = exports.getAllDeletedNotes = exports.getAllUserNotes = exports.updateUserPassword = exports.updateUserProfile = exports.getUserProfile = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client = new client_1.PrismaClient();
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const profile = yield client.user.findUnique({
            where: { id: userId },
            select: {
                firstName: true,
                lastName: true,
                userName: true,
                emailAddress: true,
                profileImage: true,
            },
        });
        if (!profile) {
            res.status(404).json({ message: "Profile not found." });
        }
        res.status(200).json({ profile });
    }
    catch (e) {
        console.log("Error getting profile", e);
        res.status(500).json({ message: "Internal Server error" });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, firstName, lastName, userName, emailAddress, profileImage } = req.body;
        const userId = req.user.id;
        const profile = yield client.user.findUnique({ where: { id: userId } });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        if (profile.id !== userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const updatedUserProfile = yield client.user.update({
            where: { id: userId },
            data: {
                id,
                firstName,
                lastName,
                userName,
                emailAddress,
                profileImage,
            },
        });
        return res
            .status(200)
            .json({ message: "Profile updated successfully.", updatedUserProfile });
    }
    catch (e) {
        console.log("Error updating note.", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserProfile = updateUserProfile;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword, confirmedPassword } = req.body;
        const userId = req.user.id;
        if (newPassword !== confirmedPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }
        const user = yield client.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.passWord);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Current passwords don't match." });
        }
        const hashedPassWord = yield bcryptjs_1.default.hash(newPassword, 10);
        const updatedPassword = yield client.user.update({
            where: { id: userId },
            data: { passWord: hashedPassWord },
        });
        res.status(200).json({ updatedPassword });
    }
    catch (e) {
        console.log("Could not update password.", e);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserPassword = updateUserPassword;
//get user notes
const getAllUserNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const notes = yield client.note.findMany({
            where: { userId: user.id, isDeleted: false },
            orderBy: {
                dateCreated: "desc",
            },
        });
        res.status(200).json(notes);
    }
    catch (e) {
        res.status(400).json({ message: "Failed to fetch notes", e });
    }
});
exports.getAllUserNotes = getAllUserNotes;
//get deleted notes for a user
const getAllDeletedNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Entered getAllDeletedNotes route");
        const user = req.user;
        if (!user) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const deletedNotes = yield client.note.findMany({
            where: {
                isDeleted: true,
                userId: user.id,
            },
            orderBy: {
                lastUpdated: "desc",
            },
        });
        if (!deletedNotes || deletedNotes.length === 0) {
            return res.status(404).json({ message: "There are no deleted posts" });
        }
        console.log(deletedNotes);
        return res.status(200).json({
            message: "Deleted notes fetched successfully",
            data: deletedNotes,
        });
    }
    catch (e) {
        console.error("Error fetching deleted notes:", e);
        return res.status(500).json({ message: "Internal Server error" });
    }
});
exports.getAllDeletedNotes = getAllDeletedNotes;
const getPinnedNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const pinnedNotes = yield client.note.findMany({
            where: {
                userId: userId,
                isPinned: true,
                isDeleted: false,
            },
            orderBy: {
                dateCreated: "desc",
            },
        });
        console.log("Found pinned notes:", pinnedNotes.length);
        return res.status(200).json({
            success: true,
            data: pinnedNotes,
            message: "Pinned notes retrieved successfully",
        });
    }
    catch (err) {
        console.error("Error in getPinnedNotes:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.getPinnedNotes = getPinnedNotes;
