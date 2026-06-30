import mongoose, { model, Schema } from "mongoose";
import { PROVIDERS } from "../constants";

const ProviderSchema = new Schema(
  {
    provider: {
      type: String,
      enum: Object.values(PROVIDERS),
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Provider = model("Provider", ProviderSchema);

export default Provider;
