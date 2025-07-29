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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const transcription_controller_1 = require("../controllers/transcription.controller");
const router = express_1.default.Router();
// Wrap the route handler to allow async/await
router.post("/transcribe", transcription_controller_1.upload.single("audio"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const convertedPath = `uploads/converted-${Date.now()}.wav`;
        const audioStream = fs_1.default.createReadStream(convertedPath);
        yield (0, transcription_controller_1.transcribeAudio)(req, res, audioStream);
        // 🔄 Convert uploaded file to WAV
        yield (0, transcription_controller_1.convertToWav)(req.file.path, convertedPath);
        // 🧠 Now call the transcribeAudio logic and pass the converted file path
        yield (0, transcription_controller_1.transcribeAudio)(req, res, audioStream);
        // 🧹 Optional: cleanup converted file
        fs_1.default.unlink(convertedPath, (err) => {
            if (err)
                console.warn("⚠️ Failed to delete converted file:", err.message);
        });
    }
    catch (err) {
        console.error("❌ Error in transcription route:", err.message);
        return res.status(500).json({ error: err.message || "Internal Server Error" });
    }
}));
exports.default = router;
