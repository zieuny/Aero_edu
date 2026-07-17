import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-load Gemini
let genAI: GoogleGenAI | null = null;
function getGemini() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    genAI = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAI;
}

// AI Endpoints
app.post("/api/ai/generate-doc", async (req, res) => {
  try {
    const { templateName, inputData } = req.body;
    const ai = getGemini();
    
    const prompt = `You are a professional technical writer for Aerospace and Autonomous systems. 
    Generate a professional technical document in Markdown format for: ${templateName}.
    Use the following input data: ${inputData}.
    Ensure the tone is formal and follows industry standards.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    res.json({ content: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai/analyze-log", async (req, res) => {
  try {
    const { logContent } = req.body;
    const ai = getGemini();
    
    const prompt = `Analyze the following ROS2/Autonomous system log and identify error patterns, potential causes, and suggested fixes:
    
    ${logContent}
    
    Provide the analysis in a structured Markdown format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    res.json({ analysis: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai/recommend-automation", async (req, res) => {
  try {
    const { workHistory } = req.body;
    const ai = getGemini();
    
    const prompt = `Based on the following work history and notes, suggest potential automation points (e.g., Python scripts for log parsing, ROS2 node templates):
    
    ${workHistory}
    
    Suggest 2-3 specific automation ideas.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    res.json({ recommendations: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
