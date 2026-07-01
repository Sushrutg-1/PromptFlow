import mongoose, { model, Schema } from "mongoose";
import { AI_MODELS, AI_PROVIDERS } from "../constants/index.js";

const ActiveModels = new Schema(
  {
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
  },
  {
    _id: false,
  }
);

const TurnSchema = new Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      index: true,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    activeModels: [ActiveModels],
  },
  { timestamps: true }
);

const Turn = model("Turn", TurnSchema);

export default Turn;
