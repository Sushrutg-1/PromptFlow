export const PROVIDERS = [
  {
    id: "google",
    name: "Gemini",
    logo: "https://cdn.simpleicons.org/googlegemini",
    enabled: true,
    models: [
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", enabled: true },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", enabled: false },
      { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", enabled: false },
    ],
  },

  {
    id: "groq",
    name: "Groq",
    logo: "https://cdn.simpleicons.org/groq",
    enabled: true,
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", enabled: true },
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B", enabled: false },
      { id: "deepseek-r1-distill", name: "DeepSeek R1 Distill", enabled: false },
      { id: "qwen-qwq-32b", name: "Qwen QwQ 32B", enabled: false },
    ],
  },

  {
    id: "openai",
    name: "ChatGPT",
    logo: "https://cdn.simpleicons.org/openai",
    enabled: false,
    models: [
      { id: "gpt-5-mini", name: "GPT-5 Mini", enabled: true },
      { id: "gpt-5", name: "GPT-5", enabled: false },
      { id: "gpt-4.1", name: "GPT-4.1", enabled: false },
      { id: "o3", name: "o3", enabled: false },
      { id: "o4-mini", name: "o4 Mini", enabled: false },
    ],
  },

  {
    id: "anthropic",
    name: "Claude",
    logo: "https://cdn.simpleicons.org/anthropic",
    enabled: false,
    models: [
      { id: "claude-sonnet-4", name: "Claude Sonnet 4", enabled: false },
      { id: "claude-opus-4", name: "Claude Opus 4", enabled: false },
      { id: "claude-haiku", name: "Claude Haiku", enabled: false },
    ],
  },

  {
    id: "xai",
    name: "xAI",
    logo: "https://cdn.simpleicons.org/x",
    enabled: false,
    models: [
      { id: "grok-4", name: "Grok 4", enabled: false },
      { id: "grok-3-mini", name: "Grok 3 Mini", enabled: false },
    ],
  },

  {
    id: "perplexity",
    name: "Perplexity",
    logo: "https://cdn.simpleicons.org/perplexity",
    enabled: false,
    models: [
      { id: "sonar", name: "Sonar", enabled: false },
      { id: "sonar-pro", name: "Sonar Pro", enabled: false },
    ],
  },
];
