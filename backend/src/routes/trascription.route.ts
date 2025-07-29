import express from "express";
import fs from "fs";
import { upload, transcribeAudio, convertToWav } from "../controllers/transcription.controller";

const router = express.Router();

// Wrap the route handler to allow async/await
router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const convertedPath = `uploads/converted-${Date.now()}.wav`;
    const audioStream = fs.createReadStream(convertedPath);
await transcribeAudio(req, res, audioStream);


    // 🔄 Convert uploaded file to WAV
    await convertToWav(req.file.path, convertedPath);

    // 🧠 Now call the transcribeAudio logic and pass the converted file path
    await transcribeAudio(req, res, audioStream);

    // 🧹 Optional: cleanup converted file
    fs.unlink(convertedPath, (err) => {
      if (err) console.warn("⚠️ Failed to delete converted file:", err.message);
    });

  } catch (err: any) {
    console.error("❌ Error in transcription route:", err.message);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

export default router;
