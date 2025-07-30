"use strict";
// import { Request, Response } from "express";
// import multer from "multer";
// import axios from "axios";
// import fs from "fs";
// import dotenv from "dotenv";
// import FormData from "form-data";
// import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
// import ffmpeg from "fluent-ffmpeg";
// import path from "path";
// dotenv.config();
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }
// ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// const upload = multer({ dest: "uploads/" });
// export const convertToWav = (inputPath: string, outputPath: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(inputPath)
//       .audioCodec("pcm_s16le")
//       .toFormat("wav")
//       .on("end", () => resolve(outputPath))
//       .on("error", (err) => reject(err))
//       .save(outputPath);
//   });
// }
// export const transcribeAudio = async (req: Request, res: Response, audioStream: fs.ReadStream) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ error: "No audio file uploaded" });
//     }
//     console.log("✅ File received:", {
//       originalname: file.originalname,
//       mimetype: file.mimetype,
//       size: file.size,
//       path: file.path,
//     });
//     const inputPath = path.resolve(file.path);
// const wavOutputPath = path.resolve(`uploads/converted-${Date.now()}.wav`);
// await convertToWav(inputPath, wavOutputPath);
// if (!fs.existsSync(wavOutputPath)) {
//   throw new Error(`WAV file not found at ${wavOutputPath}`);
// }
//     const audioData = fs.createReadStream(wavOutputPath);
//     const form = new FormData();
//     form.append("file", audioData);
//     let uploadResponse;
//     try {
//       uploadResponse = await axios.post("https://api.assemblyai.com/v2/upload", form, {
//         headers: {
//           authorization: process.env.ASSEMBLYAI_API_KEY || "",
//           ...form.getHeaders(),
//         },
//       });
//     } catch (uploadErr: any) {
//       throw new Error(`Audio upload failed: ${uploadErr.message}`);
//     }
//     const audio_url = uploadResponse.data.upload_url;
//     let transcriptResponse;
//     try {
//       transcriptResponse = await axios.post(
//         "https://api.assemblyai.com/v2/transcript",
//         { audio_url },
//         {
//           headers: {
//             authorization: process.env.ASSEMBLYAI_API_KEY || "",
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } catch (transcribeErr: any) {
//       throw new Error(`Transcription request failed: ${transcribeErr.message}`);
//     }
//     const transcriptId = transcriptResponse.data.id;
//     const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
//     let transcriptData;
//     try {
//       while (true) {
//         const pollingResponse = await axios.get(pollingEndpoint, {
//           headers: {
//             authorization: process.env.ASSEMBLYAI_API_KEY || "",
//           },
//         });
//         transcriptData = pollingResponse.data;
//         if (transcriptData.status === "completed") {
//           break;
//         } else if (transcriptData.status === "error") {
//           throw new Error(`Transcription failed: ${transcriptData.error}`);
//         }
//         await new Promise((r) => setTimeout(r, 3000));
//       }
//     } catch (pollingErr: any) {
//       throw new Error(`Polling error: ${pollingErr.message}`);
//     } finally {
//       fs.unlink(file.path, () => {});
//       fs.unlink(wavOutputPath, () => {});
//     }
//     return res.status(200).json({
//       transcript: transcriptData.text,
//     });
//   } catch (err: any) {
//     console.error("❌ Transcription error:", err.message);
//     return res.status(500).json({ error: err.message || "Internal Server Error" });
//   }
// };
// export { upload };
