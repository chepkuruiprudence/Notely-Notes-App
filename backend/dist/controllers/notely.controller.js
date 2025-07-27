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
exports.getPinnedNotes = exports.togglePinNote = exports.restoreDeletedNote = exports.deleteNote = exports.updateNote = exports.getSpecificNote = exports.getAllDeletedNotes = exports.createNote = exports.getAllNotes = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield client.note.findMany({
            where: { isDeleted: false },
            orderBy: {
                dateCreated: "desc",
            },
        });
        res.status(200).json(notes);
    }
    catch (err) {
        console.error("Fetch notes error:", err);
        res.status(500).json({ message: "Failed to fetch notes" });
    }
});
exports.getAllNotes = getAllNotes;
//create note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, synopsis, content } = req.body;
        if (!title || !synopsis || !content) {
            return res.status(400).json({ message: "Missing required body field." });
        }
        const note = yield client.note.create({
            data: {
                title,
                synopsis,
                content,
                userId: req.user.id,
            },
        });
        res.status(201).json(note);
        return;
    }
    catch (e) {
        console.error(e);
        res.status(400).json({ message: "Something went wrong" });
    }
});
exports.createNote = createNote;
//get deleted notes for a user
const getAllDeletedNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const deletedNotes = yield client.note.findMany({
            where: {
                isDeleted: true,
                userId: req.user.id,
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
//get note by ID
const getSpecificNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        const userId = req.user.id;
        const note = yield client.note.findFirst({
            where: {
                id: noteId,
                userId: userId,
            },
        });
        console.log(note);
        if (!note) {
            return res
                .status(404)
                .json({ message: "Note not found or access denied" });
        }
        return res
            .status(200)
            .json({ message: "Note displayed successfully", data: note });
    }
    catch (e) {
        console.log("Error getting note", e);
        return res.status(500).json({ message: " Internal Server Error " });
    }
});
exports.getSpecificNote = getSpecificNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, synopsis, content } = req.body;
        const noteId = req.params.id;
        const userId = req.user.id;
        const note = yield client.note.findUnique({ where: { id: noteId } });
        if (!note || note.isDeleted) {
            return res.status(404).json({ message: "Note not found." });
        }
        if (note.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        console.log("Updating note with:", { title, synopsis, content });
        const updatedNote = yield client.note.update({
            where: { id: noteId },
            data: { title, synopsis, content },
        });
        return res
            .status(200)
            .json({ message: "Note updated successfully", updatedNote });
    }
    catch (e) {
        console.log("Error updating note.", e.message, e.stack);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.updateNote = updateNote;
//delete note
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        const user = req.user;
        const note = yield client.note.findUnique({ where: { id: noteId } });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.isDeleted) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId !== user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        yield client.note.update({
            where: { id: noteId },
            data: { isDeleted: true },
        });
        return res.status(204).json({ message: "Note deleted successfully" });
    }
    catch (e) {
        console.error(" Error during deletenote operation:", e);
        return res.status(500).json({ message: "Failed to delete note" });
    }
});
exports.deleteNote = deleteNote;
//restore deleted note
const restoreDeletedNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;
        const note = yield client.note.findUnique({ where: { id: noteId } });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        if (!note.isDeleted) {
            return res.status(400).json({ message: "Note is exists" });
        }
        const restoredNote = yield client.note.update({
            where: { id: noteId },
            data: { isDeleted: false },
        });
        res
            .status(200)
            .json({ message: "Note restored successfully.", restoredNote });
    }
    catch (e) {
        console.log("Error restoring note");
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.restoreDeletedNote = restoreDeletedNote;
const togglePinNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;
        const note = yield client.note.findUnique({ where: { id: noteId } });
        if (!note || note.userId !== userId) {
            return res.status(404).json({ message: "Not found or unauthorized" });
        }
        const updated = yield client.note.update({
            where: { id: noteId },
            data: { isPinned: !note.isPinned },
        });
        return res.status(200).json({ message: "Toggled pin", updated });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.togglePinNote = togglePinNote;
const getPinnedNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        console.log("✅ GET /pinned was called");
        const pinnedNotes = yield client.note.findMany({
            where: {
                userId,
                isPinned: true,
                isDeleted: false,
            },
        });
        return res.status(200).json(pinnedNotes);
    }
    catch (err) {
        console.error("Error fetching pinned notes", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPinnedNotes = getPinnedNotes;
