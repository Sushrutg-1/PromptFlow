import { GoogleGenAI } from "@google/genai";
import env from "../config/env.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const generateGeminiResponse = async (prompt, model) => {
  if (!prompt?.trim()) {
    throw new Error("Prompt is required.");
  }
  try {
    const interaction = await ai.interactions.create({
      model: model,
      input: prompt,
    });
    const response = interaction.output_text;

    return response;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export default generateGeminiResponse;
