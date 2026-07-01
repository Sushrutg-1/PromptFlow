import mongoose, { model, Schema } from "mongoose";
import { AI_MODELS, AI_PROVIDERS, RESPONSE_STATUS } from "../constants/index.js";

const ResponseSchema = new Schema(
  {
    turnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turn",
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: Object.values(AI_PROVIDERS),
      required: true,
    },
    model: {
      type: String,
      enum: Object.values(AI_MODELS),
      required: true,
    },
    content: {
      type: String,
      default: " ",
    },
    status: {
      type: String,
      enum: Object.values(RESPONSE_STATUS),
      default: "pending",
    },
    error: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Response = model("Response", ResponseSchema);

export default Response;
