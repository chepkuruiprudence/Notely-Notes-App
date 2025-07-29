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
exports.upload = exports.transcribeAudio = exports.convertToWav = void 0;
const multer_1 = __importDefault(require("multer"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const form_data_1 = __importDefault(require("form-data"));
const ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const uploadsDir = path_1.default.join(__dirname, '../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir);
}
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.default.path);
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.upload = upload;
// 👇 Helper to convert to WAV
const convertToWav = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)(inputPath)
            .audioCodec("pcm_s16le") // standard for AssemblyAI
            .toFormat("wav")
            .on("end", () => resolve(outputPath))
            .on("error", (err) => reject(err))
            .save(outputPath);
    });
};
exports.convertToWav = convertToWav;
const transcribeAudio = (req, res, audioStream) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "No audio file uploaded" });
        }
        console.log("✅ File received:", {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
        });
        // 🔄 Convert to WAV
        const inputPath = path_1.default.resolve(file.path);
        const wavOutputPath = path_1.default.resolve(`uploads/converted-${Date.now()}.wav`);
        yield (0, exports.convertToWav)(inputPath, wavOutputPath);
        if (!fs_1.default.existsSync(wavOutputPath)) {
            throw new Error(`WAV file not found at ${wavOutputPath}`);
        }
        const audioData = fs_1.default.createReadStream(wavOutputPath);
        const form = new form_data_1.default();
        form.append("file", audioData);
        let uploadResponse;
        try {
            uploadResponse = yield axios_1.default.post("https://api.assemblyai.com/v2/upload", form, {
                headers: Object.assign({ authorization: process.env.ASSEMBLYAI_API_KEY || "" }, form.getHeaders()),
            });
        }
        catch (uploadErr) {
            throw new Error(`Audio upload failed: ${uploadErr.message}`);
        }
        const audio_url = uploadResponse.data.upload_url;
        let transcriptResponse;
        try {
            transcriptResponse = yield axios_1.default.post("https://api.assemblyai.com/v2/transcript", { audio_url }, {
                headers: {
                    authorization: process.env.ASSEMBLYAI_API_KEY || "",
                    "Content-Type": "application/json",
                },
            });
        }
        catch (transcribeErr) {
            throw new Error(`Transcription request failed: ${transcribeErr.message}`);
        }
        const transcriptId = transcriptResponse.data.id;
        const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
        let transcriptData;
        try {
            while (true) {
                const pollingResponse = yield axios_1.default.get(pollingEndpoint, {
                    headers: {
                        authorization: process.env.ASSEMBLYAI_API_KEY || "",
                    },
                });
                transcriptData = pollingResponse.data;
                if (transcriptData.status === "completed") {
                    break;
                }
                else if (transcriptData.status === "error") {
                    throw new Error(`Transcription failed: ${transcriptData.error}`);
                }
                yield new Promise((r) => setTimeout(r, 3000));
            }
        }
        catch (pollingErr) {
            throw new Error(`Polling error: ${pollingErr.message}`);
        }
        finally {
            // 🧹 Clean up both original and converted files
            fs_1.default.unlink(file.path, () => { });
            fs_1.default.unlink(wavOutputPath, () => { });
        }
        return res.status(200).json({
            transcript: transcriptData.text,
        });
    }
    catch (err) {
        console.error("❌ Transcription error:", err.message);
        return res.status(500).json({ error: err.message || "Internal Server Error" });
    }
});
exports.transcribeAudio = transcribeAudio;
