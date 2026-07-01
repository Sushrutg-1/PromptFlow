import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const env = {
  PORT: process.env.PORT || 3000,

  MONGODB_URI: process.env.MONGODB_URI,

  CORS_ORIGIN: process.env.CORS_ORIGIN,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,

  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GROQAI_API_KEY: process.env.GROQAI_API_KEY,

  NODE_ENV: process.env.NODE_ENV,
};

export default env;
