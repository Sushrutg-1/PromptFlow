import Groq from "groq-sdk";
import env from "../config/env.js";
import { AI_MODELS } from "../constants/provider.constant.js";

const groq = new Groq({
  apiKey: env.GROQAI_API_KEY,
});

const generateGroqResponse = async (prompt, model) => {
  if (!prompt?.trim()) {
    throw new Error("Prompt is required.");
  }

  try {
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};

export default generateGroqResponse;
