import OpenAI from "openai";
import env from "../config/env.js";

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const generateOpenAIResponse = async (prompt, model) => {
  if (!prompt?.trim()) {
    throw new Error("Prompt is required.");
  }

  try {
    const response = await client.responses.create({
      model,
      input: prompt,
    });

    return response.output_text;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw error;
  }
};

export default generateOpenAIResponse;
