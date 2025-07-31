import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from environment variables.");
}


router.post("/summarize", async (req, res) => {
  try {
    const { content } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Summarize this note: ${content}`,
    );
    const response = result.response;
    const text = response.text();

    res.json({ summary: text });
  } catch (error) {
    console.error("Summarization failed", error);
    res.status(500).json({ error: "Failed to summarize note." });
  }
});

export default router;
