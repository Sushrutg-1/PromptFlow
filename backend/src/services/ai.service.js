import generateGeminiResponse from "./gemini.service.js";
import generateGroqResponse from "./groq.service.js";

const generateAiResponses = async (prompt, activeModels) => {
  const responses = await Promise.all(
    activeModels.map(async ({ provider, model }) => {
      try {
        let content = "";

        if (provider === "google") {
          content = await generateGeminiResponse(prompt, model);
        }

        if (provider === "groq") {
          content = await generateGroqResponse(prompt, model);
        }

        if (provider === "openai") {
          content = await generateGroqResponse(prompt, model);
        }

        return {
          provider,
          model,
          content,
          status: "completed",
          error: null,
        };
      } catch (error) {
        console.log(`${provider} Error : `, error.message);

        return {
          provider,
          model,
          content: "",
          status: "failed",
          error: error.message,
        };
      }
    })
  );

  return responses;
};

export default generateAiResponses;
